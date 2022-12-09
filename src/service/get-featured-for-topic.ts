import { STRAPI_CLIENT } from '../config/api-client';
import { Featured, FeaturedResponse } from '../interfaces/featured';
import { getFeaturedForTopicFromAPI } from '../api-requests/get-featured-for-topic';
import allFeatured from './get-all-featured.preval';

const getCalculatedSlug = (contentEntry: object) => {
    if (!contentEntry || typeof contentEntry !== 'object') {
        return null;
    }

    let calculatedSlug;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(contentEntry)) {
        if (!value['calculated_slug']) continue;
        calculatedSlug = value['calculated_slug'];
        break;
    }

    return calculatedSlug;
};

const getFeaturedForTopicFromPreval = (
    topicSlug: string
): FeaturedResponse | undefined => {
    for (const content of allFeatured) {
        const currSlug = getCalculatedSlug(content);

        if (currSlug !== topicSlug) {
            continue;
        }

        return {
            articles: content['articles'],
            podcasts: content['podcasts'],
            videos: content['videos'],
        };
    }
};

export const getFeaturedForTopic = async (
    topicSlug: string,
    fromStatic?: boolean
): Promise<Featured> => {
    const featuredForTopic = fromStatic
        ? getFeaturedForTopicFromPreval(topicSlug)
        : await getFeaturedForTopicFromAPI(STRAPI_CLIENT, topicSlug);
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
