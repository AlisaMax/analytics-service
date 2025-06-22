import type { RefObject } from 'react';
import { useFileStore, FileStatus } from '../../store/fileStore';

export const handleClear = (inputRef: RefObject<HTMLInputElement | null>): void => {
  const { setFile, setStatus } = useFileStore.getState();

  setFile(null);
  setStatus(FileStatus.INITIAL);

  if (inputRef.current) {
    inputRef.current.value = '';
  }
};
