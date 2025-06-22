import styles from './AggregationResult.module.css';
import { useAggregatedFields } from '../../features/aggregation/AggregationFields';
import AggregationResultField from '../UI/aggregationResultField/AggregationResultField';
import { useFileStore, FileStatus } from '../../store/fileStore';

const AggregationResult = () => {
  const fields = useAggregatedFields();
  const hasData = fields.some((field) => field.value !== undefined && field.value !== null);
  const status = useFileStore((state) => state.status);

  return (
    <div className={styles.AggregationResultBlock}>
      {hasData && (status === FileStatus.LOADING || status === FileStatus.SUCCESS) ? (
        <div className={styles.AggregationResultGrid}>
          {fields.map((field) => (
            <AggregationResultField key={field.name} value={field.value} label={field.title} />
          ))}
        </div>
      ) : (
        <p className={styles.HelpText}>
          Здесь
          <br />
          появятся хайлайты
        </p>
      )}
    </div>
  );
};

export default AggregationResult;
