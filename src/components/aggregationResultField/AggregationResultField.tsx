import styles from './AggregationResultField.module.css';

type Props = {
  value: string | number | null | undefined;
  label: string;
};

const AggregationResultField = ({ value, label }: Props) => {
  return (
    <div className={styles.AggregationResultField}>
      <p className={styles.AggregationResultValue}>{value ? value : '0'}</p>
      <p className={styles.AggregationResultLabel}>{label}</p>
    </div>
  );
};

export default AggregationResultField;
