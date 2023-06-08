import { Featured, FeaturedResponse } from '../interfaces/featured';
import { CS_getFeaturedContentForTopic } from '../api-requests/get-featured-for-topic';
import allFeatured from './get-all-featured.preval';

const getFeaturedForTopicFromPreval = (
    topicSlug: string
): FeaturedResponse | undefined => {
    for (const content of allFeatured) {
        const currSlug = content['calculated_slug'];

        if (currSlug !== topicSlug) {
            continue;
        }

        return {
            articles: content['articles'],
            podcasts: content['podcasts'],
            videos: content['videos'],
            events: content['events'],
        };
    }
};

export const getFeaturedForTopic = async (
    topicSlug: string,
    fromStatic?: boolean
): Promise<Featured> => {
    const featuredForTopic = fromStatic
        ? getFeaturedForTopicFromPreval(topicSlug)
        : await CS_getFeaturedContentForTopic(topicSlug);

    const featuredArticles = (featuredForTopic?.articles || []).map(
        a => a.title
    );

    const featuredPodcasts = (featuredForTopic?.podcasts || []).map(
        p => p.title
    );
    const featuredVideos = (featuredForTopic?.videos || []).map(v => v.title);
    const featuredEvents = (featuredForTopic?.events || []).map(e => e.title);

    return {
        articles: featuredArticles ? featuredArticles : [],
        podcasts: featuredPodcasts ? featuredPodcasts : [],
        videos: featuredVideos ? featuredVideos : [],
        events: featuredEvents ? featuredEvents : [],
    };
};
