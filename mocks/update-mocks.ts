/* eslint-disable */
// @ts-nocheck

require('dotenv').config({ path: `.env.local` });

const fetch = (url, options = {}) =>
    import('node-fetch').then(({ default: fetch }) => fetch(url, options));

const { restHandlerInfo, gqlHandlerInfo } = require('./handlers.ts');
const fs = require('fs');
const path = require('path');
const { getMetaInfoQuery } = require('../src/api-requests/get-all-meta-info');

const CSHeaders = {
    access_token: process.env.CS_DELIVERY_TOKEN || '',
    branch: 'prod',
};

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

    for (let i = 0; i < restHandlerInfo.length; i++) {
        const handler = restHandlerInfo[i];

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

            // Prepends "*" to names/titles so it's easier to tell mocks apart from real data in the app.
            // Can be safely removed, if needed
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

    for (let i = 0; i < gqlHandlerInfo.length; i++) {
        const handler = gqlHandlerInfo[i];
        if (!handler.queryName.startsWith('get_all_')) {
            continue; // We don't need to write files for endpoints fetching a single entry
        }
        try {
            const fname = handler.mockFile;
            let paginationCount = 0;
            let today = new Date().toISOString();
            const url = `${
                process.env.CS_GRAPHQL_URL
            }?environment=production&query=${handler.getQuery(
                paginationCount,
                today
            )}`;
            const response = await (
                await fetch(url, { headers: CSHeaders })
            ).json();

            setMockTitles(response);
            await fs.writeFile(
                path.resolve(dataDir, `${fname}-${paginationCount}.js`),
                `module.exports=${JSON.stringify(response.data)}`,
                err => {
                    if (err) console.error(err);
                    else files++;
                }
            );

            const { total, items } =
                response.data[`all_${handler.contentTypeUID}`];

            while (total && items.length < total) {
                paginationCount++;
                const url = `${
                    process.env.CS_GRAPHQL_URL
                }?environment=production&query=${handler.getQuery(
                    paginationCount,
                    today
                )}`;
                const paginatedResponse = await (
                    await fetch(url, { headers: CSHeaders })
                ).json();
                items.push(
                    ...paginatedResponse.data[`all_${handler.contentTypeUID}`]
                        .items
                );
                setMockTitles(response);
                await fs.writeFile(
                    path.resolve(dataDir, `${fname}-${paginationCount}.js`),
                    `module.exports=${JSON.stringify(paginatedResponse.data)}`,
                    err => {
                        if (err) console.error(err);
                        else files++;
                    }
                );
            }
        } catch (e) {
            console.error(
                `An error occurred while fetching query ${handler.queryName}`,
                e
            );
        }
    }

    console.log(`Wrote ${files} files to ${dataDir}`);
};

fetchMocks();
