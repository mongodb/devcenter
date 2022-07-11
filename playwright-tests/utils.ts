import { expect } from '@playwright/test';

export const allLinksHaveHref = async (links, href) => {
    const linksCount = await links.count();
    for (let i = 0; i < linksCount; i++) {
        const el = await links.nth(i);
        expect(await el.getAttribute('href')).toBe(href);
    }
};
