import { ContentItem } from '../interfaces/content-item';
import { getAllContentItems } from './get-all-content';
import { Tag } from '../interfaces/tag';

export const getDistinctTags = async () => {
    const contents: ContentItem[] = await getAllContentItems();

    const l1l2Tags: Tag[][] = contents.map(c => c.tags);
    const flatTags = l1l2Tags.flat();

    const distinctTags: Tag[] = flatTags.reduce((allTags, tag) => {
        if (!allTags.find(existingTag => existingTag.slug === tag.slug)) {
            return allTags.concat(tag);
        }
        return allTags;
    }, [] as Tag[]);

    return distinctTags;
};
