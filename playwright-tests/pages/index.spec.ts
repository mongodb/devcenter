import { test, expect } from '@playwright/test';

test('Homepage has correct titles', async ({ page }) => {
    await page.goto('/developer');
    const title = page.locator('h1');
    await expect(title).toHaveText('MongoDB Developer Center');

    const sectionTitles = page.locator('h5');
    const text = await sectionTitles.allTextContents();
    expect(text[0] === 'Develop in your language');
    expect(text[1] === 'Integrate MongoDB with the technologies you use');
    expect(text[2] === 'Start building with these MongoDB products');
});

test('Homepage search works', async ({ page }) => {
    await page.goto('/developer');
    const searchBar = page.locator('input[name="search"]');
    await searchBar.click();
    await searchBar.fill('hello world');

    await Promise.all([
        page.waitForNavigation({ url: '/developer/search/?s=hello+world' }),
        page
            .locator(
                'text=Search all MongoDB Developer ContentSearch >> button'
            )
            .click(),
    ]);
});
