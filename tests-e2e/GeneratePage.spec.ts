import { test, expect } from '@playwright/test';
import { generatePage } from './consts';

test('Успешная генерация csv файла', async ({ page }) => {
  await page.goto(generatePage);

  await page.getByTestId('generate-button').click();
  const download = await page.waitForEvent('download');
  const doneButton = page.getByTestId('done-button');

  expect(download.suggestedFilename()).toContain('file.csv');
  expect(doneButton).toBeVisible();
});
