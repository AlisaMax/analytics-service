import { create } from 'zustand';
import type { AggregationResult } from '../types/aggregationResult';

interface AggregationState {
  result: AggregationResult | null;
  setResult: (newResult: AggregationResult) => void;
}

export const useAggregationStore = create<AggregationState>((set) => ({
  result: null,
  setResult: (newResult) => set({ result: newResult }),
}));
