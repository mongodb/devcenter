import { test } from '@playwright/test';
import { runPercy } from '../utils';

test('Podcasts visual regression testing', async ({ page }) => {
    await runPercy('/developer/podcasts', 'Podcasts')({ page });
});
