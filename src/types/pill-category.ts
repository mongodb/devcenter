export const PillCategoryValues = [
    /* order determines how categories appear in topic landing pages */
    'News & Announcements',
    'Article',
    'Demo App',
    'Quickstart',
    'Code Example',
    'Tutorial',
    'Podcast',
    'Video',
    'Industry Event',
    'User Group Meetup',
] as const;

export type PillCategory = typeof PillCategoryValues[number];

export const pillCategoryToSlug = new Map<PillCategory, string>([
    ['Article', '/articles'],
    ['Demo App', '/demo-apps'],
    ['Quickstart', '/quickstarts'],
    ['Code Example', '/code-examples'],
    ['Tutorial', '/tutorials'],
    ['News & Announcements', '/news'],
    ['Podcast', '/podcasts'],
    ['Video', '/videos'],
]);
