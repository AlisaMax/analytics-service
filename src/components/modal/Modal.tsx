import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import AggregationResultField from '../aggregationResultField/AggregationResultField';
import { transformData, type OutputItem } from '../../functions/transformAggregationData';
import icons from '../../assets/icons/icons';
import type { AggregationResult } from '../../types/aggregationResult';

interface ModalProps {
  onClose: () => void;
  data: AggregationResult;
}

const Modal = ({ onClose, data }: ModalProps) => {
  const array = transformData(data);

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          <img src={icons.cancel} alt="" />
        </button>
        {array.map((item: OutputItem) => (
          <AggregationResultField key={item.name} label={item.title} value={item.value} />
        ))}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
