import { ContentItem } from '../interfaces/content-item';
import { getAllContentItems } from './get-all-content';
import { Tag } from '../interfaces/tag';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';

export const getDistinctL1L2Slugs = async () => {
    const contents: ContentItem[] = await getAllContentItems();

    const l1l2Tags: Tag[][] = contents.map(c => c.tags);

    const flattenedL1L2Tags: Tag[] = [];

    l1l2Tags.forEach(tags => {
        tags.forEach(tag => flattenedL1L2Tags.push(tag));
    });

    const slugs: string[] = flattenedL1L2Tags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    return Array.from(new Set(slugs));
};
