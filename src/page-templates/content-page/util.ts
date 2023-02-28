import { PillCategory } from '../../types/pill-category';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';

export function normalizeCategory(category: PillCategory): string {
    if (category === 'News & Announcements') {
        return 'announcement';
    }

    return category.toLowerCase();
}

export function isPrimaryTag(tag: Tag) {
    return (
        tag.type === 'L1Product' ||
        tag.type === 'ProgrammingLanguage' ||
        tag.type === 'Technology'
    );
}

export function hasPrimaryTag(contentItem: ContentItem) {
    return contentItem.tags != null && contentItem.tags.some(isPrimaryTag);
}
