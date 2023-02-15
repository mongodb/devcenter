import { expect } from '@playwright/test';

import percySnapshot from '@percy/playwright';

export const allLinksHaveHref = async (links, href) => {
    const linksCount = await links.count();
    for (let i = 0; i < linksCount; i++) {
        const el = await links.nth(i);
        expect(await el.getAttribute('href')).toBe(href);
    }
};

const removeRelated = () => {
    const xpath = "//h5[text()='Related']";
    const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (matchingElement) {
        while (
            matchingElement.parentNode &&
            matchingElement.parentNode.firstChild
        ) {
            if (matchingElement.parentNode.lastChild) {
                matchingElement.parentNode.removeChild(
                    matchingElement.parentNode.lastChild
                );
            }
        }
    }
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

        await page.evaluate(removeRelated);
        await percySnapshot(page, pageName);
    };
