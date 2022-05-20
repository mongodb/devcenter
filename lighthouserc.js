module.exports = {
    ci: {
        collect: {
            staticDistDir: './.next',
            numberOfRuns: 2,
            url: ['http://localhost:3000/server/pages/index.html'],
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
                label: 'warn',
                'external-anchors-use-rel-noopener': 'warn', // Should reset this when we get a solution.
                'heading-order': 'warn',
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.7 }],
                'categories:best-practices': ['error', { minScore: 0.85 }],
                'categories:seo': ['error', { minScore: 0.8 }],
            },
        },
    },
};
