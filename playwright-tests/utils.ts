import { expect } from '@playwright/test';
const percySnapshot = require('@percy/playwright');
const path = require('path');

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

const mockSearchApi = async (page, mockName) => {
    const mockPath = `./playwright-tests/mocks/${mockName}.json`;
    await page.route('**/api/search/**', route =>
        route.fulfill({ path: mockPath })
    );
};

export const runPercy =
    (url, pageName, mockName?) =>
    async ({ page }) => {
        if (mockName) {
            await mockSearchApi(page, mockName);
        }

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
