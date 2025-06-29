import cn from 'classnames';
import styles from './HistoryItem.module.css';
import Modal from '../../../../components/modal/Modal';
import { useState } from 'react';
import icons from '../../../../assets/icons/icons';
import { useHistoryStore } from '../../../../store/historyStore';
import type { AggregationResult } from '../../../../types/aggregationResult';

interface HistoryItemProps {
  id: string;
  fileName: string;
  date: string;
  status: boolean;
  data: AggregationResult;
}

const HistoryItem = (props: HistoryItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const removeHistoryItemById = useHistoryStore((state) => state.removeHistoryItemById);

  const openModal = (): void => {
    if (props.status) {
      setIsModalOpen(true);
    }
  };

  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <div className={styles.HistoryItemBlock} data-key={props.id}>
        <div className={styles.HistoryItem} onClick={openModal} style={{ cursor: 'pointer' }}>
          <span className={styles.FileName}>{props.fileName}</span>
          <span className={styles.Date}>{props.date.split(',')[0]}</span>
          <span
            className={cn(
              styles.Status,
              styles.Happy,
              props.status === false ? styles.Unactive : ''
            )}
          >
            Обработан успешно
          </span>
          <span
            className={cn(styles.Status, styles.Sad, props.status === true ? styles.Unactive : '')}
          >
            Не удалось обработать
          </span>
        </div>
        <div className={styles.DeleteButton} onClick={() => removeHistoryItemById(props.id)}>
          <img src={icons.trash} alt="delete" />
        </div>
      </div>

      {isModalOpen && <Modal onClose={closeModal} data={props.data} />}
    </>
  );
};

export default HistoryItem;
