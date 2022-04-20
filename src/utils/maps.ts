import { PillCategory, PillCategorySlug } from '../types/pill-category';

export const pillCategoryToSlug = new Map<PillCategory, PillCategorySlug>([
    ['Article', 'articles'],
    ['Demo App', 'demo-apps'],
    ['Tutorial', 'tutorials'],
    ['Podcast', 'podcasts'],
    ['Video', 'videos'],
]);

export const slugToPillCategory = new Map<PillCategorySlug, PillCategory>([
    ['articles', 'Article'],
    ['demo-apps', 'Demo App'],
    ['tutorials', 'Tutorial'],
    ['podcasts', 'Podcast'],
    ['videos', 'Video'],
]);
