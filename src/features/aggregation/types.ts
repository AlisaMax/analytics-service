export interface AggregatedField {
  name: string;
  title: string;
  value: string | number | null | undefined;
}

export type AggregationSelector<T = string | number | null | undefined> = () => T;
