import FileGenerator from './components/fileGenerator/FileGenerator';
import Header from '../../components/header/Header';
import { useGenerateFileStore, GenerateFileStatus } from '../../store/generateFileStore';
import styles from './CsvGeneratorPage.module.css';
import cn from 'classnames';

const CsvGeneratorPage = () => {
  const status = useGenerateFileStore((store) => store.status);

  const renderHelpText = (): string => {
    switch (status) {
      case GenerateFileStatus.ERROR:
        return 'упс, не то...';
      case GenerateFileStatus.LOADING:
        return 'идёт процесс генерации';
      case GenerateFileStatus.SUCCESS:
        return 'файл сгенерирован!';
      default:
        return '';
    }
  };

  return (
    <>
      <Header />
      <div className={cn(styles.ContentBlock, styles[status])} data-testid="generate-page">
        <p className={styles.HelpText}>Сгенерируйте готовый csv-файл нажатием одной кнопки </p>
        <FileGenerator />
        <p className={styles.StatusText}>{renderHelpText()}</p>
      </div>
    </>
  );
};

export default CsvGeneratorPage;
