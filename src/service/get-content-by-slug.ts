import { STRAPI_CLIENT } from '../config/api-client';
import { ContentItem } from '../interfaces/content-item';
import { getAllFeatured } from './get-all-featured';
import { getContentBySlugFromAPI } from '../api-requests/get-content-by-slug';
import { getRelatedContentForSlugFromAPI } from '../api-requests/get-related-content';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
    mapRelatedContentToContentItems,
} from './build-content-items';

export const getContentForSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    const allFeatured = await getAllFeatured();
    slug = '/' + slug;

    const content = await getContentBySlugFromAPI(STRAPI_CLIENT, slug);

    if (content.podcasts.length > 0) {
        const podcastSeries = await getAllPodcastSeries();
        const mappedPodcasts = mapPodcastsToContentItems(
            content.podcasts,
            podcastSeries,
            allFeatured.podcasts
        );
        return mappedPodcasts[0];
    } else if (content.videos.length > 0) {
        const videoSeries = await getAllVideoSeries();
        const mappedVideos = mapVideosToContentItems(
            content.videos,
            videoSeries,
            allFeatured.videos
        );
        return mappedVideos[0];
    } else if (content.articles.length > 0) {
        const articleSeries = await getAllArticleSeries();
        const mappedArticles = mapArticlesToContentItems(
            content.articles,
            articleSeries,
            allFeatured.articles
        );
        return mappedArticles[0];
    }

    return null;
};

export const getRelatedContentForSlug: (
    slug: string,
    currentSlug: string
) => Promise<ContentItem[]> = async (slug: string, currentSlug: string) => {
    const relatedContent = await getRelatedContentForSlugFromAPI(
        STRAPI_CLIENT,
        slug,
        currentSlug
    );
    const mappedRelatedContent =
        mapRelatedContentToContentItems(relatedContent);
    return mappedRelatedContent;
};
