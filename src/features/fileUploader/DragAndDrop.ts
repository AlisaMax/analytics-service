import { useFileStore, FileStatus } from '../../store/fileStore';

export const onDragOver = (e: React.DragEvent<HTMLElement>): void => {
  e.preventDefault();
  useFileStore.getState().setStatus(FileStatus.UPLOADING);
};

export const onDragEnter = (e: React.DragEvent<HTMLElement>): void => {
  e.preventDefault();
  useFileStore.getState().setStatus(FileStatus.UPLOADING);
};

export const onDragLeave = (e: React.DragEvent<HTMLElement>): void => {
  e.preventDefault();
  useFileStore.getState().setStatus(FileStatus.INITIAL);
};

export const handleDrop = (e: React.DragEvent<HTMLElement>): void => {
  e.preventDefault();
  const { setFile, setIsCorrect, setStatus } = useFileStore.getState();

  const droppedFile = e.dataTransfer.files[0] || null;

  setFile(droppedFile);

  if (droppedFile?.type === 'text/csv') {
    setIsCorrect(true);
    setStatus(FileStatus.ADDED);
  } else {
    setIsCorrect(false);
    setStatus(FileStatus.ERROR);
  }
};
