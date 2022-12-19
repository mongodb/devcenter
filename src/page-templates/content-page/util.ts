import { PillCategory } from '../../types/pill-category';

export function normalizeCategory(category: PillCategory): string {
    if (category === 'News & Announcements') {
        return 'announcement';
    }

    return category.toLowerCase();
}
