import { ContentItem } from '../interfaces/content-item';

const getRelatedContent = (
    slug: string,
    allContents: ContentItem[],
    currentSlug: string
): ContentItem[] => {
    const relatedContent = allContents.filter(c => {
        if (
            c.collectionType !== 'Video' &&
            c.collectionType !== 'Podcast' &&
            c.slug !== currentSlug
        ) {
            const slugsInTags = c.tags.map(tag => tag.slug);
            return slugsInTags.includes(slug);
        }
    });

    // Shuffle array
    relatedContent.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return relatedContent.slice(0, 4);
};
export default getRelatedContent;
