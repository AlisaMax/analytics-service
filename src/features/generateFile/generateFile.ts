import { getGeneratedFile } from '../../api/getGeneratedFile';
import { useGenerateFileStore, GenerateFileStatus } from '../../store/generateFileStore';

export const generateFile = async () => {
  const { setStatus } = useGenerateFileStore.getState();

  setStatus(GenerateFileStatus.LOADING);

  try {
    const response = await getGeneratedFile(0.01);

    if (!response.ok) {
      const errorData = await response.json();
      setStatus(GenerateFileStatus.ERROR);
      throw new Error(errorData?.message || 'Сервер вернул ошибку при генерации файла');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.csv';
    a.click();

    URL.revokeObjectURL(url);
    setStatus(GenerateFileStatus.SUCCESS);
  } catch (err) {
    setStatus(GenerateFileStatus.ERROR);
    console.error('Не удалось сгенерировать файл:', err);
    throw err;
  }
};
