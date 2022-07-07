import { test, expect } from '@playwright/test';

test('All News & Announcements Page has correct titles', async ({ page }) => {
    await page.goto('/developer/news');
    const title = page.locator('h1');
    await expect(title).toHaveText('News & Announcements');

    const sectionTitles = page.locator('h5');
    const text = await sectionTitles.allTextContents();
    expect(text[0]).toEqual('Featured News & Announcements');
    expect(text[1]).toEqual('All News & Announcements');
});
