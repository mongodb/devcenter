import getL1Content from '../requests/get-l1-content';
import { PillCategory } from '../types/pill-category';

export const getContentTypesForTopic = (slug: string): PillCategory[] => {
    const { content } = getL1Content(slug);
    const contentTypeMemo = new Set<PillCategory>();
    // This will keep track of what content type pages we've already added and only add the route if we haven't already.
    content.forEach(({ category }) => {
        if (!contentTypeMemo.has(category)) {
            contentTypeMemo.add(category);
        }
    });
    return Array.from(contentTypeMemo);
};
