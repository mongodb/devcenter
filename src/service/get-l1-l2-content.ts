import { ContentItem } from '../interfaces/content-item';
import { getAllContentItems } from './get-all-content';

export const getL1L2Content = async (
    inputSlug: string
): Promise<ContentItem[]> => {
    const contents: ContentItem[] = await getAllContentItems();

    /*
    filter the ones which have tags having slug matching input slug
     */

    const filteredContents = contents.filter(c => {
        const slugsInTags = c.tags.map(tag => tag.slug);
        return slugsInTags.includes(inputSlug);
    });

    //identifyFeaturedContent
    return filteredContents;
};
