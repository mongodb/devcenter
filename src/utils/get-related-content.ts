import { ContentItem } from '../interfaces/content-item';
import allContentData from '../service/get-all-content.preval';

export const getRelatedContent = (
    slug: string,
    currentSlug: string
): ContentItem[] => {
    const relatedContent = allContentData.filter(c => {
        if (
            c.collectionType !== 'Video' &&
            c.collectionType !== 'Podcast' &&
            c.slug !== currentSlug
        ) {
            const slugsInTags = c.tags.map(tag => tag.slug);
            return slugsInTags.includes(slug);
        }
    });

    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
        // Shuffle array
        relatedContent.sort(() => 0.5 - Math.random());
    } else {
        // Keep mock builds consistent
        relatedContent.sort((a, b) => (a.title > b.title ? 1 : -1));
    }

    // Get sub-array of first n elements after shuffled
    return relatedContent.slice(0, 4);
};
