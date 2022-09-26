const path = require('path');
const fs = require('fs');

const getURLs = () =>
    fs
        .readdirSync('src/pages', { withFileTypes: true })
        .filter(
            dirent =>
                dirent.isFile() &&
                !(dirent.name.startsWith('_') || dirent.name.startsWith('[')) &&
                !dirent.name.includes('index')
        )
        .map(
            dirent =>
                `http://localhost:3000/developer/${
                    path.parse(dirent.name).name
                }`
        );
module.exports = {
    ci: {
        collect: {
            numberOfRuns: 2,
            startServerCommand: 'yarn start',
            url: ['http://localhost:3000/developer', ...getURLs()],
            settings: {
                preset: 'desktop',
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                // 'link-text': 'warn',
                // 'link-name': 'warn',
                // 'csp-xss': 'warn',
                // 'aria-roles': 'warn',
                // 'errors-in-console': 'warn',
                // 'html-has-lang': 'warn',
                // 'image-alt': 'warn',
                // 'unsized-images': 'warn',
                // 'crawlable-anchors': 'warn',
                // 'offscreen-images': 'warn',
                // 'unused-javascript': 'warn',
                // label: 'warn',
                // 'external-anchors-use-rel-noopener': 'warn', // Should reset this when we get a solution.
                // 'heading-order': 'warn',
                // 'valid-source-maps': 'warn',
                // 'unused-css-rules': 'warn',
                // canonical: 'warn',
                // 'color-contrast': 'warn',
                // 'aria-allowed-attr': 'warn',
                // 'uses-responsive-images': 'warn',
                // 'inspector-issues': 'warn',
                // 'uses-rel-preconnect': 'warn',
                // 'non-composited-animations': 'warn',

                'categories:performance': ['error', { minScore: 0.5 }],
                'categories:accessibility': ['error', { minScore: 0.7 }],
                'categories:best-practices': ['error', { minScore: 0.7 }],
                'categories:seo': ['error', { minScore: 0.6 }],
            },
        },
    },
};
