module.exports = {
    ci: {
        collect: {
            // staticDistDir: './.next',
            numberOfRuns: 3,
            url: [
                'http://localhost:3000/developer/',
                'http://localhost:3000/developer/articles/',
                'http://localhost:3000/developer/tutorials/',
            ],
        },
        upload: {
            target: 'temporary-public-storage',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'link-text': 'warn',
                'link-name': 'warn',
                'csp-xss': 'warn',
                'aria-roles': 'warn',
                'errors-in-console': 'warn',
                'html-has-lang': 'warn',
                'image-alt': 'warn',
                'unsized-images': 'warn',
                'crawlable-anchors': 'warn',
                'offscreen-images': 'warn',
                'unused-javascript': 'warn',
                label: 'warn',
                'external-anchors-use-rel-noopener': 'warn', // Should reset this when we get a solution.
                'heading-order': 'warn',
                'categories:performance': ['error', { minScore: 0.8 }],
                'categories:accessibility': ['error', { minScore: 0.7 }],
                'categories:best-practices': ['error', { minScore: 0.8 }],
                'categories:seo': ['error', { minScore: 0.8 }],
            },
        },
    },
};
