import { postFile } from '../../api/postFile';
import { map } from '../../functions/transformAggregationData';
import { useAggregationStore } from '../../store/aggregationStore';
import { useFileStore, FileStatus } from '../../store/fileStore';
import { useHistoryStore } from '../../store/historyStore';
import type { AggregationResult } from '../../types/aggregationResult';

export const aggregateFile = async (): Promise<void> => {
  const { file, setStatus } = useFileStore.getState();

  if (!file) return;

  setStatus(FileStatus.LOADING);

  try {
    const response = await postFile(file);
    if (!response || !response.body) {
      throw new Error('Нет ответа от сервера');
    }

    const { setResult } = useAggregationStore.getState();
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const result = useAggregationStore.getState().result;

        const requiredFields = Object.keys(map);
        const isValid = !!result && requiredFields.every((field) => field in result);

        setStatus(isValid ? FileStatus.SUCCESS : FileStatus.ERROR);

        const historyItem = {
          id: Date.now().toString(),
          name: file.name,
          date: new Date().toLocaleString(),
          success: isValid,
          result: isValid ? result : undefined,
        };

        useHistoryStore.getState().addHistoryItem(historyItem);

        break;
      }

      const text = decoder.decode(value, { stream: true });
      buffer += text;

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const json: AggregationResult = JSON.parse(line);
          setResult(json);
        } catch (e) {
          console.error('Ошибка парсинга строки:', line);
        }
      }
    }
  } catch (error) {
    setStatus(FileStatus.ERROR);
    console.error('Ошибка при загрузке файла:', error);
    // Добавляю в историю неудачную попытку загрузки файла
    const historyItem = {
      id: Date.now().toString(),
      name: file.name,
      date: new Date().toLocaleString(),
      success: false,
      result: undefined,
    };
    useHistoryStore.getState().addHistoryItem(historyItem);
    throw error;
  }
};
