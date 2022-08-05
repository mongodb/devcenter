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
            .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
            .slice(0, 3 - featured.length);
        featured = featured.concat(extraFeatured);
    }
    return featured;
};
