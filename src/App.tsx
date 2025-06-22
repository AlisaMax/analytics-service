import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CsvAnalyticPage from './pages/CsvAnalytic/CsvAnalyticPage';
import CsvGeneratorPage from './pages/CsvGenerator/CsvGeneratorPage';
import HistoryPage from './pages/History/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CsvAnalyticPage />} />
        <Route path="generator/" element={<CsvGeneratorPage />} />
        <Route path="history/" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
