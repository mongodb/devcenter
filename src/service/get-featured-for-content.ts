import { ContentItem } from '../interfaces/content-item';
import { getFeaturedForTopic } from './get-featured-for-topic';

export const getFeaturedForContent = async (
    content: ContentItem[],
    topicSlug: string,
    fromStatic?: boolean
) => {
    const allFeatured = await getFeaturedForTopic(topicSlug, fromStatic);
    const flattenedAllFeatured = Object.values(allFeatured).flat();
    let featured = content
        .filter(item =>
            flattenedAllFeatured.find(title => title === item.title)
        )
        .slice(0, 3);

    if (featured.length < 3) {
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
            .slice(0, 3 - featured.length);
        featured = featured.concat(extraFeatured);
    }

    return featured;
};
