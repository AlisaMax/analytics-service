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
  status: FileStatus;
  setFile: (file: File | null) => void;
  setStatus: (value: FileStatus) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  status: FileStatus.INITIAL,

  setFile: (file) => set({ file }),
  setStatus: (value) => set({ status: value }),
}));
