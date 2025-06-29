import { test, expect, Page } from '@playwright/test';
import { baseUrl, generatePage } from './consts';
import path from 'path';

async function uploadFile(page: Page, filePath: string) {
  await page.getByTestId('input-file').click();
  await page.setInputFiles('input[type="file"]', filePath);
}

test('возможность добавить файл при нажатии на кнопку', async ({ page }) => {
  await page.goto(baseUrl);

  const filePath = path.resolve('tests-e2e', 'fixtures', 'file.csv');
  await uploadFile(page, filePath);

  const text = await page.getByTestId('help-text').textContent();
  expect(text).toBe('файл загружен!');
});

test('отправка валидного файла', async ({ page }) => {
  await page.goto(baseUrl);

  const filePath = path.resolve('tests-e2e', 'fixtures', 'file.csv');
  await uploadFile(page, filePath);
  await page.getByTestId('send-button').click();

  const helpText = page.getByTestId('help-text');
  await expect(helpText).toHaveText('готово!', { timeout: 10000 });

  expect(page.getByTestId('aggregation-result-grid')).toBeVisible();
});

test('отправка невалидного файла', async ({ page }) => {
  await page.goto(baseUrl);

  const filePath = path.resolve('tests-e2e', 'fixtures', 'empty.csv');
  await uploadFile(page, filePath);
  await page.getByTestId('send-button').click();

  const helpText = page.getByTestId('help-text');
  await expect(helpText).toHaveText('упс, не то...', { timeout: 10000 });

  expect(page.getByTestId('aggregation-result-grid')).not.toBeVisible();
});
