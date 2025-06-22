import type { AggregationResult } from '../types/aggregationResult';

export type Input = AggregationResult;

export interface OutputItem {
  name: string;
  title: string;
  value: string | number;
}

export const map: Record<keyof AggregationResult, string> = {
  total_spend_galactic: 'общие расходы в галактических кредитах',
  less_spent_civ: 'цивилизация с минимальными расходами',
  rows_affected: 'количество обработанных записей',
  big_spent_at: 'день года с максимальными расходами',
  less_spent_at: 'день года с минимальными расходами',
  big_spent_value: 'максимальная сумма расходов за день',
  big_spent_civ: 'цивилизация с максимальными расходами',
  average_spend_galactic: 'средние расходы в галактических кредитах',
};

export function transformData(data: Input): OutputItem[] {
  return Object.keys(map).flatMap((key) => {
    const value = data[key as keyof AggregationResult];
    if (value === undefined) return [];

    return {
      name: key,
      title: map[key as keyof AggregationResult],
      value: typeof value === 'number' ? Math.round(value) : value,
    };
  });
}
