import { dayToDate } from '../../functions/dayToDate';
import { useAggregationStore } from '../../store/aggregationStore';
import type { AggregationSelector } from './types';

export const useTotalSpend: AggregationSelector<number | null> = () =>
  useAggregationStore((s) => {
    const value = s.result?.total_spend_galactic;
    return value ? Math.round(value) : null;
  });

export const useRowsAffected: AggregationSelector<number | undefined> = () =>
  useAggregationStore((s) => s.result?.rows_affected);

export const useLessSpentAt: AggregationSelector<string | null> = () =>
  useAggregationStore((s) => {
    const day = s.result?.less_spent_at;
    return day ? dayToDate(day) : null;
  });

export const useBigSpentAt: AggregationSelector<string | null> = () =>
  useAggregationStore((s) => {
    const day = s.result?.big_spent_at;
    return day ? dayToDate(day) : null;
  });

export const useBigSpend: AggregationSelector<number | null> = () =>
  useAggregationStore((s) => {
    const value = s.result?.big_spent_value;
    return value ? Math.round(value) : null;
  });

export const useAverageSpend: AggregationSelector<number | null> = () =>
  useAggregationStore((s) => {
    const value = s.result?.average_spend_galactic;
    return value ? Math.round(value) : null;
  });

export const useBigSpentCiv: AggregationSelector<string | undefined> = () =>
  useAggregationStore((s) => s.result?.big_spent_civ);

export const useLessSpentCiv: AggregationSelector<string | undefined> = () =>
  useAggregationStore((s) => s.result?.less_spent_civ);
