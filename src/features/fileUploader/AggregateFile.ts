import { postFile } from '../../api/postFile';
import { useAggregationStore } from '../../store/aggregationStore';
import { FileStatus, useFileStore } from '../../store/fileStore';
import { useHistoryStore } from '../../store/historyStore';
import type { AggregationResult } from '../../types/aggregationResult';

const AggregateFile = async (rows: number): Promise<void> => {
  const { file, setStatus } = useFileStore.getState();
  if (!file) return;

  const response = await postFile(file, rows);

  if (!response || !response.body) {
    throw new Error('Нет ответа от сервера');
  }

  const { setResult } = useAggregationStore.getState();
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      const result = useAggregationStore.getState().result;
      const isValid = result?.total_spend_galactic !== 0 || result?.average_spend_galactic !== 0;
      setStatus(isValid ? FileStatus.SUCCESS : FileStatus.ERROR);

      const historyItem = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date().toLocaleString(),
        success: isValid,
        result: isValid ? result : null,
      };

      useHistoryStore.getState().addHistoryItem(historyItem);

      break;
    }

    const decoded = decoder.decode(value, { stream: true });
    const lines = decoded.split('\n');

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
};

export default AggregateFile;
