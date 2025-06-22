import { getGeneratedFile } from '../../api/getGeneratedFile';
import { useGenerateFileStore, GenerateFileStatus } from '../../store/generateFileStore';

export const generateFile = async () => {
  const { setStatus } = useGenerateFileStore.getState();

  setStatus(GenerateFileStatus.LOADING);

  try {
    const response = await getGeneratedFile(0.01);

    if (!response.ok) {
      const error = await response.json();
      setStatus(GenerateFileStatus.ERROR);
      return { success: false, error };
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.csv';
    a.click();
    URL.revokeObjectURL(url);

    setStatus(GenerateFileStatus.SUCCESS);
    return { success: true };
  } catch (err) {
    setStatus(GenerateFileStatus.ERROR);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Неизвестная ошибка',
    };
  }
};
