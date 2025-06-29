import { beforeEach } from 'node:test';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';
import { act, render, screen } from '@testing-library/react';
import * as postFileModule from '../../api/postFile';
import { FileStatus, useFileStore } from '../../store/fileStore';
import { useHistoryStore } from '../../store/historyStore';
import { aggregateFile } from '../../features/fileUploader/aggregateFile';

vi.mock('../../api/postFile');

describe('История загрузки', () => {
  const correctData = {
    total_spend_galactic: 1,
    rows_affected: 1,
    less_spent_at: 1,
    big_spent_at: 1,
    big_spent_value: 1,
    average_spend_galactic: 1,
    big_spent_civ: 'test',
    less_spent_civ: 'test',
  };

  const incorrectData = {
    total_spend_galactic: 1,
    rows_affected: 1,
    less_spent_at: 1,
    big_spent_civ: 'test',
    less_spent_civ: 'test',
  };

  const testFile = new File([], 'data.csv', { type: 'text/csv' });

  const prepareFileAggregation = async (data: Record<string, string | number>) => {
    const chunk = new TextEncoder().encode(JSON.stringify(data) + '\n');

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(chunk);
        controller.close();
      },
    });

    await act(async () => {
      useFileStore.setState({ file: testFile, status: FileStatus.ADDED });
    });

    vi.spyOn(postFileModule, 'postFile').mockResolvedValue({
      body: stream,
    } as any);

    await act(async () => {
      const promise = aggregateFile();
      await promise;
    });
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('сохранение истории в LocalStorage', async () => {
    render(<App />);

    await act(async () => {
      useHistoryStore.getState().clearHistory();
    });

    await prepareFileAggregation(correctData);

    const history = useHistoryStore.getState().history;

    expect(history).toBeDefined();
    expect(history[0].name).toEqual('data.csv');
    expect(history[0].result).toEqual(correctData);
  });

  it('отображение успешно обработанного файла на странице истории', async () => {
    render(<App />);
    await act(async () => {
      useHistoryStore.getState().clearHistory();
    });
    const link = screen.getByTestId('history-link');
    link.click();
    await prepareFileAggregation(correctData);

    const history = useHistoryStore.getState().history;
    const historyPage = screen.getByTestId('history-page');
    const historyItem = historyPage.querySelector(`[data-key="${history[0].id}"]`);

    expect(historyItem).toBeDefined();
    expect(historyItem?.textContent).toContain('data.csv');
    expect(historyItem?.textContent).toContain(history[0].date.split(',')[0]);

    const statusEl = Array.from(historyItem!.querySelectorAll('span')).find((span) =>
      span.textContent?.includes('Обработан успешно')
    );

    const hasUnactiveClass = Array.from(statusEl!.classList).some((cls) =>
      cls.includes('Unactive')
    );

    expect(hasUnactiveClass).toBeFalsy();
  });

  it('отображение некорректно обработанного файла на странице истории', async () => {
    render(<App />);
    await act(async () => {
      useHistoryStore.getState().clearHistory();
    });
    const link = screen.getByTestId('history-link');
    link.click();
    await prepareFileAggregation(incorrectData);

    const history = useHistoryStore.getState().history;

    const historyPage = screen.getByTestId('history-page');
    const historyItem = historyPage.querySelector(`[data-key="${history[0].id}"]`);

    expect(historyItem).toBeDefined();
    expect(historyItem?.textContent).toContain('data.csv');
    expect(historyItem?.textContent).toContain(history[0].date.split(',')[0]);

    const statusEl = Array.from(historyItem!.querySelectorAll('span')).find((span) =>
      span.textContent?.includes('Не удалось обработать')
    );

    const hasUnactiveClass = Array.from(statusEl!.classList).some((cls) =>
      cls.includes('Unactive')
    );

    expect(hasUnactiveClass).toBeFalsy();
  });
});
