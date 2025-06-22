import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AggregationResult } from '../types/aggregationResult';

interface HistoryItem {
  id: string;
  name: string;
  date: string;
  success: boolean;
  result?: AggregationResult;
}
interface HistoryStore {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  removeHistoryItemById: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addHistoryItem: (item) => set({ history: [...get().history, item] }),

      removeHistoryItemById: (id) =>
        set({ history: get().history.filter((item) => item.id !== id) }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'aggregationHistory',
    }
  )
);
