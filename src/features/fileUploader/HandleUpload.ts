import { useFileStore, FileStatus } from '../../store/fileStore';
import AggregateFile from './AggregateFile';

export const HandlerUpload = async () => {
  const rows = 10000;
  const { file, setStatus } = useFileStore.getState();
  setStatus(FileStatus.LOADING);

  if (!file) {
    // setError('Файл не выбран');
    return;
  }

  try {
    await AggregateFile(rows);
  } catch (e) {
    setStatus(FileStatus.ERROR);
    console.log('Ошибка при загрузке файла');
  }
};
