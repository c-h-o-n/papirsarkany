import { test as setup } from '@playwright/test';

setup('bypass cookie consent', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    if (window.Truendo) {
      window.Truendo.acceptAllCookies();
    }
  });

  await page.context().storageState({ path: 'playwright-storage-state.json' });
});
