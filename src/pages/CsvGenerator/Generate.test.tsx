import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FileGenerator from './components/fileGenerator/FileGenerator';
import * as getGeneratedFileModule from '../../api/getGeneratedFile';

vi.mock('../../api/getGeneratedFile');

describe('Генерация CSV файла', () => {
  it('вывод ошибки при генерации файла', async () => {
    vi.spyOn(getGeneratedFileModule, 'getGeneratedFile').mockImplementation(async () => {
      throw new Error('Ошибка: 500');
    });

    const fileGenerator = render(<FileGenerator />);
    const button = screen.getByTestId('generate-button');
    button.click();

    let errorButton;
    await waitFor(() => {
      errorButton = screen.getByTestId('error-button');
    });

    expect(errorButton).toBeTruthy();
  });
});
