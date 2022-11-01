const fs = require('fs');
const path = require('path');

const beforeSnapshot = async () => {
    // https://docs.percy.io/docs/lazy-loading
    const scrollForNextImages = async () => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 0; i < document.body.scrollHeight; i += 100) {
            window.scrollTo(0, i);
            await delay(20);
        }
    };
    // Remove Related section on content pages because it shows different content each time which breaks the diffs
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
                matchingElement.parentNode.removeChild(
                    matchingElement.parentNode.lastChild
                );
            }
        }
    };

    await scrollForNextImages();
    removeRelated();
};

module.exports = async () => {
    let topicPages = fs
        .readdirSync('src/pages', { withFileTypes: true })
        .filter(
            dirent =>
                dirent.isFile() &&
                !(dirent.name.startsWith('_') || dirent.name.startsWith('[')) &&
                !dirent.name.includes('index')
        )
        .map(dirent => `/${path.parse(dirent.name).name}`);

    const urls = [
        '/',
        ...topicPages,

        // // Grab some random specific pages from across the site since we don't want to test all pages
        '/products/mongodb',
        '/products/mongodb/articles',
        '/technologies/nodejs/',
        '/technologies/nodejs/code-examples/',
        '/expertise-levels/introductory/',
        '/expertise-levels/introductory/news/',
        '/languages/javascript/',
        '/languages/javascript/podcasts/',
        '/podcasts/ep--117-the-mongodb-world-series---beray-bentesen-from-qubitro/',
        '/videos/mongodb---node-js--connecting---crud-operations--part-1-of-4-',
        '/products/mongodb/bson-data-types-decimal128',
        '/languages/csharp/saving-data-in-unity3d-using-files',
    ];

    return urls.map(url => ({
        name: url,
        url: `http://localhost:3000/developer${url}`,
        execute: {
            beforeSnapshot,
        },
    }));
};
