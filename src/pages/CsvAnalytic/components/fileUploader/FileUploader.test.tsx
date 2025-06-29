import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { FileStatus, useFileStore } from '../../../../store/fileStore';
import FileUploader from './FileUploader';
import { beforeEach } from 'node:test';

vi.mock('../../../../store/fileStore');

describe('Загрузка файла', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(Object.values(FileStatus))('рендерит компонент в зависимости от статуса %s', (status) => {
    const mockSetStatus = vi.fn();
    const mockSetFile = vi.fn();

    const mockStore = {
      file: null,
      status: status,
      setFile: mockSetFile,
      setStatus: mockSetStatus,
    };

    const mockedUseFileStore = vi.mocked(useFileStore);
    mockedUseFileStore.mockImplementation((selector) => {
      return selector(mockStore);
    });

    const { asFragment } = render(<FileUploader />);

    expect(asFragment()).toMatchSnapshot();
  });
});
