import cn from 'classnames';
import styles from './FileUploader.module.css';
import Button from '../../../../components/button/Button';
import { handleDrop, onDragEnter, onDragLeave, onDragOver } from './utils/DragAndDrop';
import { useFileStore, FileStatus } from '../../../../store/fileStore';
import { aggregateFile } from '../../../../features/fileUploader/aggregateFile';
import ActionResultButton from '../../../../components/actionResultButton/ActionResultButton';
import Loader from '../../../../components/loader/Loader';
import { handleFileChange } from '../../../../features/fileUploader/handleFileChange';
import { useRef } from 'react';

const FileUploader = () => {
  const status = useFileStore((state) => state.status);
  const file = useFileStore((state) => state.file);
  const setStatus = useFileStore((state) => state.setStatus);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const renderByStatus = (): { uploader: React.ReactNode; helpText: string } => {
    const baseHelpText = 'или перетащите сюда';

    switch (status) {
      case FileStatus.INITIAL:
      case FileStatus.UPLOADING:
        return {
          helpText: baseHelpText,
          uploader: (
            <label className={styles.inputFileButton} htmlFor="inputFile" data-testid="input-file">
              <input
                id="inputFile"
                ref={inputRef}
                className={styles.InputFile}
                multiple={false}
                type="file"
                onClick={() => setStatus(FileStatus.UPLOADING)}
                onChange={handleFileChange}
              />
              {status === FileStatus.INITIAL || status === FileStatus.UPLOADING
                ? 'Загрузить файл'
                : file?.name || ''}
            </label>
          ),
        };

      case FileStatus.ADDED:
        return {
          helpText: 'файл загружен!',
          uploader: <ActionResultButton title={file?.name} status={status} inputRef={inputRef} />,
        };

      case FileStatus.LOADING:
        return {
          helpText: 'идёт парсинг файла',
          uploader: <Loader />,
        };

      case FileStatus.SUCCESS:
        return {
          helpText: 'готово!',
          uploader: <ActionResultButton title={file?.name} status={status} inputRef={inputRef} />,
        };

      case FileStatus.ERROR:
        return {
          helpText: 'упс, не то...',
          uploader: <ActionResultButton title={file?.name} status={status} inputRef={inputRef} />,
        };

      default:
        return {
          helpText: '',
          uploader: '',
        };
    }
  };

  const { uploader, helpText } = renderByStatus();

  return (
    <div className={cn(styles.UplodeWrap, styles[status])}>
      <div
        className={cn(styles.UplodeBlock)}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <div className={styles.fileAddWrap}>{uploader}</div>
        <p data-testid="help-text" className={styles.HelpText}>
          {helpText}
        </p>
      </div>
      <Button
        label="Отправить"
        isDisabled={status !== FileStatus.ADDED}
        className={styles.sendButton}
        onClick={aggregateFile}
        data-testid="send-button"
      />
    </div>
  );
};

export default FileUploader;
