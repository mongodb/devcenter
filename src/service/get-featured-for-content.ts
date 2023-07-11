import { FEATURED_CONTENT_MAX_COUNT } from '../data/constants';
import { ContentItem } from '../interfaces/content-item';
import { getFeaturedForTopic } from './get-featured-for-topic';

export const getFeaturedForContent = async (
    content: ContentItem[],
    topicSlug: string,
    fromStatic?: boolean
) => {
    const allFeatured = await getFeaturedForTopic(topicSlug, fromStatic);
    const flattenedAllFeatured: string[] = Object.values(allFeatured).flat();
    let featured: ContentItem[] = [];

    // forEach() instead of map() to avoid adding undefined into featured
    flattenedAllFeatured.forEach(title => {
        if (featured.length === FEATURED_CONTENT_MAX_COUNT) return;
        const foundContent = content.find(c => c.title === title);
        if (foundContent) featured.push(foundContent);
    });

    if (featured.length < FEATURED_CONTENT_MAX_COUNT) {
        const extraFeatured = content
            .filter(item => !featured.find(({ slug }) => slug === item.slug))
            .sort((a, b) => {
                const contentDate1 = Array.isArray(a.contentDate)
                    ? a.contentDate[0]
                    : a.contentDate;
                const contentDate2 = Array.isArray(b.contentDate)
                    ? b.contentDate[0]
                    : b.contentDate;
                return contentDate1.localeCompare(contentDate2);
            })
            .slice(0, FEATURED_CONTENT_MAX_COUNT - featured.length);
        featured = featured.concat(extraFeatured);
    }

    return featured;
};
