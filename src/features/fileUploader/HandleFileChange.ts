import { useFileStore, FileStatus } from '../../store/fileStore';

export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { setFile, setIsCorrect, setStatus } = useFileStore.getState();

  const file = e.target.files?.[0] || null;
  setFile(file);

  e.target.value = '';

  if (file?.type === 'text/csv') {
    setIsCorrect(true);
    setStatus(FileStatus.ADDED);
  } else {
    setStatus(FileStatus.ERROR);
  }
};
