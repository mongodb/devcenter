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
                'aria-allowed-attr': 'warn',
                canonical: 'warn',
                'csp-xss': 'warn',
                'color-contrast': 'warn',
                'errors-in-console': 'warn',
                'external-anchors-use-rel-noopener': 'warn',
                'heading-order': 'warn',
                'inspector-issues': 'warn',
                'offscreen-images': 'warn',
                'non-composited-animations': 'warn',
                'unsized-images': 'warn',
                'unused-css-rules': 'warn',
                'unused-javascript': 'warn',
                'uses-responsive-images': 'warn',
                'valid-source-maps': 'warn',
                'categories:performance': ['error', { minScore: 1 }],
                'categories:accessibility': ['error', { minScore: 1 }],
                'categories:best-practices': ['error', { minScore: 1 }],
                'categories:seo': ['error', { minScore: 1 }],
            },
        },
    },
};
