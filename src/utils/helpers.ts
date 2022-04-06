import { PillCategory } from '../types/pill-category';
import { ContentPiece } from '../interfaces/content-piece';

// Loops over all content pieces and returns an Array of content types that are present in the content.
export const getContentTypesFromContent = (
    content: ContentPiece[]
): PillCategory[] => {
    const contentTypeMemo = new Set<PillCategory>();
    // This will keep track of what content type pages we've already added and only add the route if we haven't already.
    content.forEach(({ category }) => {
        if (!contentTypeMemo.has(category)) {
            contentTypeMemo.add(category);
        }
    });
    return Array.from(contentTypeMemo);
};
