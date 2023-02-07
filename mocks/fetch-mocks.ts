/* eslint-disable */
// @ts-nocheck

require('dotenv').config({ path: `.env.local` });

const fetch = url =>
    import('node-fetch').then(({ default: fetch }) => fetch(url));

const { handlerInfo } = require('./handlers.ts');
const fs = require('fs');
const path = require('path');

// Deeply iterate through the response JSON and prepend names/titles with an asterisk so we know they're mocked
const setMockTitles = obj => {
    Object.keys(obj).forEach(key => {
        if (key === 'name' || key === 'title') {
            obj[key] = `*${obj[key]}`;
        }

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            setMockTitles(obj[key]);
        }
    });
};

const fetchMocks = async () => {
    const dataDir = path.resolve(__dirname, './data');

    if (!fs.existsSync(dataDir)) {
        await fs.mkdir(dataDir, err => {
            if (err) {
                console.error(
                    'An error occurred while making data directory',
                    err
                );
                process.exit();
            }
        });
    }

    let files = 0;

    for (let i = 0; i < handlerInfo.length; i++) {
        const handler = handlerInfo[i];

        try {
            const fname = handler.mockFile;
            const response = await (await fetch(handler.url)).json();

            if (
                response?.message?.[0]?.messages?.[0]?.id ===
                'Auth.form.error.ratelimit'
            ) {
                console.warn(`Hit ratelimit for ${handler.url}, retrying...`);
                await new Promise(res => setTimeout(res, 3000));
                i--;
                continue;
            }

            // Prepends "*" to names/titles so it's easier to tell mocks apart from real data. This can be removed if needed
            setMockTitles(response);

            await fs.writeFile(
                path.resolve(dataDir, `${fname}.js`),
                `module.exports=${JSON.stringify(response)}`,
                err => {
                    if (err) console.error(err);
                    else files++;
                }
            );
        } catch (e) {
            console.error(`An error occurred while fetching ${handler.url}`, e);
        }
    }

    console.log(`Wrote ${files} files to ${dataDir}`);
};

fetchMocks();
