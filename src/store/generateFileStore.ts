import { create } from 'zustand';

export enum GenerateFileStatus {
  INITIAL = 'initial',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface GenerateFileStore {
  status: GenerateFileStatus;
  setStatus: (value: GenerateFileStatus) => void;
}

export const useGenerateFileStore = create<GenerateFileStore>((set) => ({
  status: GenerateFileStatus.INITIAL,

  setStatus: (value) => set({ status: value }),
}));
