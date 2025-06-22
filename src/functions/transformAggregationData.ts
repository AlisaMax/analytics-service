import type { AggregationResult } from '../types/aggregationResult';

export type Input = AggregationResult;

export interface OutputItem {
  name: string;
  title: string;
  value: string | number;
}

const map: Record<string, string> = {
  total_spend_galactic: 'общие расходы в галактических кредитах',
  less_spent_civ: 'цивилизация с минимальными расходами',
  rows_affected: 'количество обработанных записей',
  big_spent_at: 'день года с максимальными расходами',
  less_spent_at: 'день года с минимальными расходами',
  big_spent_value: 'максимальная сумма расходов за день',
  big_spent_civ: 'цивилизация с максимальными расходами',
  average_spend_galactic: 'средние расходы в галактических кредитах',
};

const keys = [
  'total_spend_galactic',
  'less_spent_civ',
  'rows_affected',
  'big_spent_at',
  'less_spent_at',
  'big_spent_value',
  'big_spent_civ',
  'average_spend_galactic',
];

export function transformData(data: Input): OutputItem[] {
  return keys
    .filter((key) => key in data)
    .map((key) => ({
      name: key,
      title: map[key],
      value:
        typeof data[key as keyof AggregationResult] === 'number'
          ? Math.round(data[key as keyof AggregationResult] as number)
          : data[key as keyof AggregationResult],
    }));
}
