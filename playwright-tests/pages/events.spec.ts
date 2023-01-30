import { test, expect } from '@playwright/test';
import { mockApiRoute, runPercy } from '../utils';

const EVENTS_PAGE = '/developer/events';

test('Events page has correct title', async ({ page }) => {
    await page.goto(EVENTS_PAGE);
    const title = page.locator('h1');
    await expect(title).toHaveText('Events');
});

test('Events page has correct logic to display featured', async ({ page }) => {
    await page.goto(EVENTS_PAGE);

    await mockApiRoute(page, '**/api/location/**', 'location');

    await expect(
        page.locator('div[data-testid="featured-card-section"] h2')
    ).toHaveText('Featured Events');

    await page.locator('text=Search Events').fill('test');
    await expect(
        page.locator('data-testid="featured-card-section"')
    ).toHaveCount(0);

    await page.locator('text=Search Events').fill('');
    await page.locator('id=location-search').click();
    await page.locator('id=location-search').type('test');

    await page.locator('div[role="dropdown"] li:nth-child(1)').click();

    await expect(
        page.locator('data-testid="featured-card-section"')
    ).toHaveCount(0);
});

test(
    'Events page visual regression testing',
    runPercy(EVENTS_PAGE, 'Events', 'events')
);
