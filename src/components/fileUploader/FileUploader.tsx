import React, { useRef } from 'react';
import styles from './FileUploader.module.css';
import cn from 'classnames';
import Button from '../UI/button/Button';
import {
  handleDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
} from '../../features/fileUploader/DragAndDrop';
import { useFileStore, FileStatus } from '../../store/fileStore';
import { HandlerUpload } from '../../features/fileUploader/HandleUpload';
import Loader from '../UI/loader/Loader';
import { handleFileChange } from '../../features/fileUploader/HandleFileChange';
import ActionResultButton from '../UI/actionResultButton/ActionResultButton';

const FileUploader = () => {
  const status = useFileStore((state) => state.status);
  const file = useFileStore((state) => state.file);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const renderHelpText = (): string => {
    switch (status) {
      case FileStatus.INITIAL:
      case FileStatus.UPLOADING:
        return 'или перетащите сюда';
      case FileStatus.ERROR:
        return 'упс, не то...';
      case FileStatus.ADDED:
        return 'файл загружен!';
      case FileStatus.LOADING:
        return 'идёт парсинг файла';
      case FileStatus.SUCCESS:
        return 'готово!';
      default:
        return '';
    }
  };

  const renderUploader = (): React.ReactElement | string => {
    switch (status) {
      case FileStatus.INITIAL:
      case FileStatus.UPLOADING:
        return (
          <label className={styles.inputFileButton} htmlFor="inputFile">
            <input
              id="inputFile"
              ref={inputRef}
              className={styles.InputFile}
              multiple={false}
              type="file"
              onClick={() => useFileStore.getState().setStatus(FileStatus.UPLOADING)}
              onChange={(e) => handleFileChange(e)}
            />
            {(() => {
              if (status === FileStatus.INITIAL || status === FileStatus.UPLOADING)
                return 'Загрузить файл';
              return file?.name || '';
            })()}
          </label>
        );
      case FileStatus.ERROR:
      case FileStatus.SUCCESS:
      case FileStatus.ADDED:
        return <ActionResultButton title={file?.name} status={status} inputRef={inputRef} />;
      case FileStatus.LOADING:
        return <Loader />;
      default:
        return '';
    }
  };

  return (
    <div className={cn(styles.UplodeWrap, styles[status])}>
      <div
        className={cn(styles.UplodeBlock)}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <div className={styles.fileAddWrap}>{renderUploader()}</div>
        <p className={styles.HelpText}>{renderHelpText()}</p>
      </div>
      <Button
        label="Отправить"
        isDisabled={status !== FileStatus.ADDED}
        className={styles.sendButton}
        onClick={HandlerUpload}
      />
    </div>
  );
};

export default FileUploader;
