const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test('loads and shows main content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Magic Show|Jewelry/i);
  });

  test('has navigation links', async ({ page }) => {
    await page.goto('/');
    const shopLink = page.getByRole('link', { name: /shop/i }).first();
    await expect(shopLink).toBeVisible();
  });

  test('newsletter section exists', async ({ page }) => {
    await page.goto('/');
    const subscribeButton = page.getByRole('button', { name: /subscribe/i });
    await expect(subscribeButton).toBeVisible();
  });
});
