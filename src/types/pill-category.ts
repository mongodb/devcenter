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
