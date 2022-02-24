module.exports = {
    ci: {
        collect: {
            staticDistDir: './.next',
            numberOfRuns: 2,
            url: [
                'http://localhost/server/pages/index.html',
                'http://localhost/server/pages/topics/atlas.html',
            ],
        },
        upload: {
            target: 'temporary-public-storage',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'csp-xss': 'warn',
                'aria-roles': 'warn',
                'errors-in-console': 'warn',
                'html-has-lang': 'warn',
                'image-alt': 'warn',
                'unsized-images': 'warn',
                label: 'warn',
                'external-anchors-use-rel-noopener': 'warn', // Should reset this when we get a solution.
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.7 }],
                'categories:best-practices': ['error', { minScore: 0.85 }],
                'categories:seo': ['error', { minScore: 0.9 }],
            },
        },
    },
};
