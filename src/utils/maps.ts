import { PillCategory, PillCategorySlugs } from '../types/pill-category';

export const pillCategoryToSlug = new Map<PillCategory, PillCategorySlugs>([
    ['Article', 'article'],
    ['Demo App', 'demo-app'],
    ['Tutorial', 'tutorial'],
    ['Podcast', 'podcast'],
    ['Video', 'video'],
]);
