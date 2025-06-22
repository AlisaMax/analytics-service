import type { RefObject, FC } from 'react';
import { handleClear } from '../../../features/fileUploader/handleClear';
import icons from '../../../assets/icons/icons';
import styles from './ActionResultButton.module.css';
import cn from 'classnames';
import { useGenerateFileStore, GenerateFileStatus } from '../../../store/generateFileStore';
import { FileStatus } from '../../../store/fileStore';

type StatusType = FileStatus | GenerateFileStatus;

interface ActionResultButtonProps {
  title: string | undefined;
  status: StatusType;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const ActionResultButton: FC<ActionResultButtonProps> = ({ title, status, inputRef }) => {
  const { setStatus } = useGenerateFileStore.getState();

  return (
    <div className={cn(styles.actionResultWrapper, styles[status])}>
      <div className={styles.BlockTitle}>{title}</div>
      <span
        onClick={() => (inputRef ? handleClear(inputRef) : setStatus(GenerateFileStatus.INITIAL))}
        className={styles.clearFileButton}
      >
        <img src={icons.cancel} alt="очистить" />
      </span>
    </div>
  );
};

export default ActionResultButton;
