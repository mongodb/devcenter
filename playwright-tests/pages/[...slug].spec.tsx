import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Content page has all components on tutorial', async ({ page }) => {
    await page.goto('/developer/products/atlas/mongoose-versus-nodejs-driver/');

    // TertiaryNav
    const tertiaryNavTitle = page.locator(
        'a[href="/developer/products/atlas/"] h6'
    );
    expect(await tertiaryNavTitle.count()).toEqual(1);

    // Breadcrumbs
    expect(
        await page
            .locator('div[data-testid="breadcrumbs"] a:has-text("Tutorials")')
            .count()
    ).toEqual(1);

    // Title
    const title = page.locator('h1');
    expect(title).toHaveText(
        'Do You Need Mongoose When Developing Node.js and MongoDB Applications?'
    );

    // Author Lockup
    const authorName = page.locator('"Ado Kukic"');
    expect(await authorName.getAttribute('href')).toBe(
        '/developer/author/ado-kukic/'
    );

    // Social Buttons, top and bottom
    expect(await page.locator('a[title="Copy link"]').count()).toEqual(2);

    // Tags
    expect(
        await page
            .locator('div[data-testid="tag-section"] a:text("Aggregations")')
            .count()
    ).toEqual(1);

    // TOC
    expect(await page.locator('"Table of Contents"').count()).toEqual(1);
    const firstTOCLink = page.locator(
        'a:has-text("Object Data Modeling in MongoDB")'
    );
    expect(await firstTOCLink.count()).toEqual(1);
    expect(await firstTOCLink.getAttribute('href')).toBe(
        '#object-data-modeling-in-mongodb'
    );

    // Rating, top and bottom
    expect(
        await page.locator('span:has-text("Rate this tutorial")').count()
    ).toEqual(2);
    expect(await page.locator('div[aria-label="One Star"]').count()).toEqual(2);

    // First section title
    const sectionAnchor = page.locator('div#object-data-modeling-in-mongodb');
    const sectionTitle = sectionAnchor.locator(
        'h4:text("Object Data Modeling in MongoDB")'
    );
    expect(await sectionTitle.count()).toEqual(1);

    // Related Section
    expect(await page.locator('h5:text("Related")').count()).toEqual(1);
    expect(
        await page.locator('div[data-testid="card-related"]').count()
    ).toEqual(4);

    // Request button
    expect(
        await page.locator('button:text("Request a Tutorial")').count()
    ).toEqual(1);
});

test('request content flow on content page works', async ({ page }) => {
    await page.goto('/developer/products/atlas/mongoose-versus-nodejs-driver/');
    // Mock the actual request
    await page.route('**/*ontent', route => {
        route.fulfill();
    });
    await Promise.all([
        page.waitForSelector('h5:text("Request a Tutorial")'),
        page.locator('button:text("Request a Tutorial")').click(),
    ]);
    await Promise.all([
        page.waitForSelector('"Thanks for your request!"'),
        page.locator('button:text("Submit")').click(),
    ]);
});

test('1 star rating flow on content page', async ({ page }) => {
    await page.goto('/developer/products/atlas/mongoose-versus-nodejs-driver/');
    page.setDefaultTimeout(5000);
    // Mock the actual request
    await page.route('**/*eedback', route => {
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify({ _id: '12345' }),
        });
    });
    // One Star
    await Promise.all([
        (await page.locator('div[aria-label="One Star"]').nth(0)).click(),
        page.waitForSelector(':has-text("We\'re sorry to hear that")'),
    ]);
    await Promise.all([
        page.waitForSelector('"How could this be better?"'),
        page.locator('button:has-text("Tell us more")').click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
    await page.locator('button:text("Close")').click();

    // Three Stars
    await Promise.all([
        page.waitForSelector('"Thanks for the feedback."'),
        (await page.locator('div[aria-label="Three Stars"]').nth(0)).click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
    await page.locator('button:text("Close")').click();

    // Five Stars
    await Promise.all([
        page.waitForSelector('"Thanks for the feedback!"'),
        page.waitForSelector('img[alt="misc_sunrise"]'),
        (await page.locator('div[aria-label="Five Stars"]').nth(0)).click(),
    ]);
    await Promise.all([
        page.waitForSelector('"How can we improve this tutorial?"'),
        page.locator('button:has-text("Tell us more")').click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
});

test('3 star rating flow on content page', async ({ page }) => {
    await page.goto('/developer/products/atlas/mongoose-versus-nodejs-driver/');
    page.setDefaultTimeout(5000);
    // Mock the actual request
    await page.route('**/*eedback', route => {
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify({ _id: '12345' }),
        });
    });

    // Three Stars
    await Promise.all([
        page.waitForSelector('"Thanks for the feedback."'),
        (await page.locator('div[aria-label="Three Stars"]').nth(0)).click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
    await page.locator('button:text("Close")').click();

    // Five Stars
    await Promise.all([
        page.waitForSelector('"Thanks for the feedback!"'),
        page.waitForSelector('img[alt="misc_sunrise"]'),
        (await page.locator('div[aria-label="Five Stars"]').nth(0)).click(),
    ]);
    await Promise.all([
        page.waitForSelector('"How can we improve this tutorial?"'),
        page.locator('button:has-text("Tell us more")').click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
});

test('5 star rating flow on content page', async ({ page }) => {
    await page.goto('/developer/products/atlas/mongoose-versus-nodejs-driver/');
    page.setDefaultTimeout(5000);
    // Mock the actual request
    await page.route('**/*eedback', route => {
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify({ _id: '12345' }),
        });
    });

    // Five Stars
    await Promise.all([
        page.waitForSelector('"Thanks for the feedback!"'),
        page.waitForSelector('img[alt="misc_sunrise"]'),
        (await page.locator('div[aria-label="Five Stars"]').nth(0)).click(),
    ]);
    await Promise.all([
        page.waitForSelector('"How can we improve this tutorial?"'),
        page.locator('button:has-text("Tell us more")').click(),
    ]);
    await Promise.all([
        page.waitForSelector('"We appreciate your feedback."'),
        page.locator('button:text("Next")').click(),
    ]);
});
