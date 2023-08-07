import { expect } from '@playwright/test';

import percySnapshot from '@percy/playwright';

export const allLinksHaveHref = async (links, href) => {
    const linksCount = await links.count();
    for (let i = 0; i < linksCount; i++) {
        const el = await links.nth(i);
        expect(await el.getAttribute('href')).toBe(href);
    }
};

const removeSrcsets = () => {
    const images = document.querySelectorAll('img');

    images.forEach(image => {
        image.removeAttribute('srcset');
    });
};

export const runPercy =
    (url, pageName) =>
    async ({ page }) => {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            for (let i = 0; i < document.body.scrollHeight; i += 100) {
                window.scrollTo(0, i);
                await delay(10);
            }
        });

        await page.evaluate(removeSrcsets);
        console.log('PERCY RUNNING');
        await percySnapshot(page, pageName);
        console.log('took snapshot');
    };
