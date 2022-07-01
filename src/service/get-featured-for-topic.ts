import { STRAPI_CLIENT } from '../config/api-client';
import { Featured } from '../interfaces/featured';
import { getFeaturedForTopicFromAPI } from '../api-requests/get-featured-for-topic';

export const getFeaturedForTopic = async (
    topicSlug: string
): Promise<Featured> => {
    const featuredForTopic = await getFeaturedForTopicFromAPI(
        STRAPI_CLIENT,
        topicSlug
    );
    const featuredArticles = (featuredForTopic?.articles || []).map(
        a => a.title
    );
    const featuredPodcasts = (featuredForTopic?.podcasts || []).map(
        p => p.title
    );
    const featuredVideos = (featuredForTopic?.videos || []).map(v => v.title);
    const featured = {
        articles: featuredArticles ? featuredArticles : [],
        podcasts: featuredPodcasts ? featuredPodcasts : [],
        videos: featuredVideos ? featuredVideos : [],
    };
    return featured;
};
