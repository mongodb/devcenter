module.exports = {
    ci: {
        collect: {
            staticDistDir: './.next',
            numberOfRuns: 2,
            url: ['http://localhost:3000/topics/atlas'],
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
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.8 }],
                'categories:best-practices': ['error', { minScore: 0.9 }],
                'categories:seo': ['error', { minScore: 0.9 }],
            },
        },
    },
};
