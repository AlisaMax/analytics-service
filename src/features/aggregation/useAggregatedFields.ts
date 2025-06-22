import {
  useAverageSpend,
  useBigSpend,
  useBigSpentAt,
  useBigSpentCiv,
  useLessSpentAt,
  useLessSpentCiv,
  useRowsAffected,
  useTotalSpend,
} from './AggregationSelectors';
import type { AggregatedField } from './types';

export const useAggregatedFields = (): AggregatedField[] => {
  const totalSpend = useTotalSpend();
  const rowsAffected = useRowsAffected();
  const lessSpentAt = useLessSpentAt();
  const bigSpentAt = useBigSpentAt();
  const bigSpend = useBigSpend();
  const averageSpend = useAverageSpend();
  const bigSpentCiv = useBigSpentCiv();
  const lessSpentCiv = useLessSpentCiv();

  return [
    {
      name: 'total_spend_galactic',
      title: 'общие расходы в галактических кредитах',
      value: totalSpend,
    },
    {
      name: 'less_spent_civ',
      title: 'цивилизация с минимальными расходами',
      value: lessSpentCiv,
    },
    {
      name: 'rows_affected',
      title: 'количество обработанных записей',
      value: rowsAffected,
    },
    {
      name: 'big_spent_at',
      title: 'день года с максимальными расходами',
      value: bigSpentAt,
    },
    {
      name: 'less_spent_at',
      title: 'день года с минимальными расходами',
      value: lessSpentAt,
    },
    {
      name: 'big_spent_value',
      title: 'максимальная сумма расходов за день ',
      value: bigSpend,
    },
    {
      name: 'big_spent_civ',
      title: 'цивилизация с максимальными расходами',
      value: bigSpentCiv,
    },
    {
      name: 'average_spend_galactic',
      title: 'средние расходы в галактических кредитах',
      value: averageSpend,
    },
  ];
};
