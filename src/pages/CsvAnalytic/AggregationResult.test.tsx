import { beforeEach } from 'node:test';
import { describe, it, expect, vi } from 'vitest';
import { useFileStore, FileStatus } from '../../store/fileStore';
import * as postFileModule from '../../api/postFile';
import { act, render, screen, waitFor } from '@testing-library/react';
import AggregationResult from './components/aggregationResult/AggregationResult';
import { aggregateFile } from '../../features/fileUploader/aggregateFile';

vi.mock('../../api/postFile');

describe('Отображение прогресса обработки', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('обновление данных при получении чанков', async () => {
    const testFile = new File(['test'], 'test.csv');
    useFileStore.setState({ file: testFile, status: FileStatus.LOADING });

    const chunks = [
      JSON.stringify({ total_spend_galactic: 123 }) + '\n',
      JSON.stringify({ total_spend_galactic: 456 }) + '\n',
    ].map((str) => new TextEncoder().encode(str));

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(chunks[0]);
        await new Promise((res) => setTimeout(res, 1000));
        controller.enqueue(chunks[1]);
        await new Promise((res) => setTimeout(res, 1000));
        controller.close();
      },
    });

    vi.spyOn(postFileModule, 'postFile').mockResolvedValue({
      body: stream,
    } as any);

    render(<AggregationResult />);

    await act(async () => {
      const promise = aggregateFile();

      await waitFor(() => {
        expect(screen.getByText('123')).toBeTruthy();
      });

      await waitFor(() => {
        expect(screen.getByText('456')).toBeTruthy();
      });

      await promise;
    });
  });
});
