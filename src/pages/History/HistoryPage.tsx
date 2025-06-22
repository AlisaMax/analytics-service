import Header from '../../components/header/Header';
import HistoryItem from './components/historyItem/HistoryItem';
import Button from '../../components/button/Button';
import { useHistoryStore } from '../../store/historyStore';
import type { AggregationResult } from '../../types/aggregationResult';
import styles from './History.module.css';

const HistoryPage = () => {
  const history = useHistoryStore((state) => state.history);
  const clearHistory = useHistoryStore((state) => state.clearHistory);

  return (
    <>
      <Header />
      <div className={styles.ContentBlock}>
        {history.map((item) => (
          <HistoryItem
            key={item.id}
            id={item.id}
            fileName={item.name}
            date={item.date}
            status={item.success}
            data={item.result as AggregationResult}
          />
        ))}
      </div>
      <div className={styles.ButtonBlock}>
        <Button
          className={styles.GenerateMore}
          label="Сгенерировать больше"
          onClick={() => (window.location.href = '/generator')}
        />
        <Button
          className={styles.ClearHistory}
          label="Очистить всё"
          onClick={() => clearHistory()}
        />
      </div>
    </>
  );
};

export default HistoryPage;
