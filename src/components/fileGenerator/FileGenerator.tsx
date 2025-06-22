import { generateFile } from '../../features/generateFile/generateFile';
import { useGenerateFileStore, GenerateFileStatus } from '../../store/generateFileStore';
import ActionResultButton from '../UI/actionResultButton/ActionResultButton';
import Button from '../UI/button/Button';
import Loader from '../UI/loader/Loader';
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
          />
        );
      case GenerateFileStatus.ERROR:
        return <ActionResultButton title={'Ошибка'} status={status} />;
      case GenerateFileStatus.SUCCESS:
        return <ActionResultButton title={'Done!'} status={status} />;
      case GenerateFileStatus.LOADING:
        return <Loader />;
      default:
        return '';
    }
  };

  return <div>{renderButton()}</div>;
};

export default FileGenerator;
