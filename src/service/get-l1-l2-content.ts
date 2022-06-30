import { ContentItem } from '../interfaces/content-item';
import allContent from './get-all-content.preval';

export const getL1L2Content = async (
    inputSlug: string
): Promise<ContentItem[]> => {
    /*
    filter the ones which have tags having slug matching input slug
     */
    const filteredContents = allContent.filter(c => {
        const slugsInTags = c.tags.map(tag => tag.slug);
        return slugsInTags.includes(inputSlug);
    });

    return filteredContents;
};
