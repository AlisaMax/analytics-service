import { create } from 'zustand';

export enum FileStatus {
  INITIAL = 'initial',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  ADDED = 'added',
}

interface FileStore {
  file: File | null;
  isCorrect: boolean;
  status: FileStatus;
  setFile: (file: File | null) => void;
  setIsCorrect: (value: boolean) => void;
  setStatus: (value: FileStatus) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  isCorrect: true,
  status: FileStatus.INITIAL,

  setFile: (file) => set({ file }),
  setIsCorrect: (value) => set({ isCorrect: value }),
  setStatus: (value) => set({ status: value }),
}));
