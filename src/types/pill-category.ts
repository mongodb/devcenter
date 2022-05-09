export const PillCategoryValues = [
    'Article',
    'Demo App',
    'Quickstart',
    'Code Example',
    'Tutorial',
    'Podcast',
    'Video',
] as const;

export type PillCategory = typeof PillCategoryValues[number];

export const pillCategoryToSlug = new Map<PillCategory, string>([
    ['Article', '/articles'],
    ['Demo App', '/demo-apps'],
    ['Quickstart', '/quickstarts'],
    ['Code Example', '/code-examples'],
    ['Tutorial', '/tutorials'],
    [
        'Podcast',
        'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624',
    ],
    ['Video', '/videos'],
]);
