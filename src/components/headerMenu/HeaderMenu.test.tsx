import { describe, it, expect } from 'vitest';
import App from '../../App';
import { act, render } from '@testing-library/react';

describe('Навигация', () => {
  it.each([
    ['analytic-link', 'analytic-page', '/'],
    ['generate-link', 'generate-page', '/generator'],
    ['history-link', 'history-page', '/history'],
  ])('при нажатии открывается раздел %s', async (linkId, pageId, path) => {
    const app = render(<App />);
    const link = await app.findByTestId(linkId);

    act(() => {
      link.click();
    });

    const { pathname } = window.location;
    const analyticPage = await app.findByTestId(pageId);

    expect(pathname).toEqual(path);
    expect(analyticPage).toBeTruthy();
    // expect(link.classList).toContain('active');
  });
});
