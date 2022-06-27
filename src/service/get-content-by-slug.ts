import { STRAPI_CLIENT } from '../config/api-client';
import { ContentItem } from '../interfaces/content-item';
import { getArticleBySlugFromAPI } from '../api-requests/get-articles';
import { getVideoBySlug } from '../service/get-all-videos';
import { getPodcastBySlug } from '../service/get-all-podcasts';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { getAllFeatured } from './get-all-featured';
import { CollectionType } from '../types/collection-type';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
} from './build-content-items';
import { Article } from '../interfaces/article';
import { Video } from '../interfaces/video';
import { Podcast } from '../interfaces/podcast';

export const getContentItemFromSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    /**
     * TODO: Refactor even further. Setup GraphQL on Strapi CMS to use GraphQL Query API OR
     * create a custom endpoint on CMS that will fetch from multiple models in single API call.
     */

    const allFeatured = await getAllFeatured();
    slug = '/' + slug;

    let content: Article | Video | Podcast | null = null;
    let contentType: CollectionType | null = null;

    // videos always starts with /videos
    if (slug.startsWith('/videos')) {
        content = await getVideoBySlug(slug);
        contentType = 'Video';
    } else if (slug.startsWith('/podcasts')) {
        content = await getPodcastBySlug(slug);
        contentType = 'Podcast';
    } else {
        content = await getArticleBySlugFromAPI(STRAPI_CLIENT, slug);
        contentType = 'Article';
    }

    if (!content) return null;

    if (contentType === 'Article') {
        const articleSeries = await getAllArticleSeries();
        const mappedArticles = mapArticlesToContentItems(
            [content as Article],
            articleSeries,
            allFeatured.articles
        );
        return mappedArticles[0];
    } else if (contentType === 'Podcast') {
        const podcastSeries = await getAllPodcastSeries();
        const mappedPodcasts = mapPodcastsToContentItems(
            [content as Podcast],
            podcastSeries,
            allFeatured.podcasts
        );
        return mappedPodcasts[0];
    } else if (contentType === 'Video') {
        const videoSeries = await getAllVideoSeries();
        const mappedVideos = mapVideosToContentItems(
            [content as Video],
            videoSeries,
            allFeatured.videos
        );
        return mappedVideos[0];
    }

    return null;
};