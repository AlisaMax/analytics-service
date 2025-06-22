import AggregationResult from '../../components/aggregationResult/AggregationResult';
import FileUploader from '../../components/fileUploader/FileUploader';
import Header from '../../components/header/Header';
import styles from './CsvAnalytic.module.css';

function CsvAnalyticPage() {
  return (
    <>
      <Header />
      <div className={styles.ContentBlock}>
        <p className={styles.HelpText}>
          Загрузите <b>csv</b> файл и <b>получите полную</b> информацию о нём за сверхнизкое время
        </p>
        <FileUploader />
        <AggregationResult />
      </div>
    </>
  );
}

export default CsvAnalyticPage;
