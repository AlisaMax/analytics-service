import { generateFile } from '../../../../features/generateFile/generateFile';
import { useGenerateFileStore, GenerateFileStatus } from '../../../../store/generateFileStore';
import ActionResultButton from '../../../../components/actionResultButton/ActionResultButton';
import Button from '../../../../components/button/Button';
import Loader from '../../../../components/loader/Loader';
import styles from './FileGenerator.module.css';

const FileGenerator = () => {
  const status = useGenerateFileStore((store) => store.status);

  const renderButton = (): React.ReactElement | string => {
    switch (status) {
      case GenerateFileStatus.INITIAL:
        return (
          <Button
            label="Начать генерацию"
            className={styles.GenerateButton}
            onClick={generateFile}
            data-testid="generate-button"
          />
        );
      case GenerateFileStatus.ERROR:
        return <ActionResultButton title={'Ошибка'} status={status} data-testid="error-button" />;
      case GenerateFileStatus.SUCCESS:
        return <ActionResultButton title={'Done!'} status={status} data-testid="done-button" />;
      case GenerateFileStatus.LOADING:
        return <Loader />;
      default:
        return '';
    }
  };

  return <div>{renderButton()}</div>;
};

export default FileGenerator;
