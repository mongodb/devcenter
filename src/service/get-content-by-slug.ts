import { STRAPI_CLIENT } from '../config/api-client';
import { ContentItem } from '../interfaces/content-item';
import { getArticleBySlugFromAPI } from '../api-requests/get-articles';
import { getVideoBySlug } from '../service/get-all-videos';
import { getPodcastBySlug } from '../service/get-all-podcasts';
import allArticleSeries from './get-all-article-series.preval';
import allVideoSeries from './get-all-video-series.preval';
import allPodcastSeries from './get-all-podcast-series.preval';
import allFeatured from './get-all-featured.preval';
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
        const mappedArticles = mapArticlesToContentItems(
            [content as Article],
            allArticleSeries,
            allFeatured.articles
        );
        return mappedArticles[0];
    } else if (contentType === 'Podcast') {
        const mappedPodcasts = mapPodcastsToContentItems(
            [content as Podcast],
            allPodcastSeries,
            allFeatured.podcasts
        );
        return mappedPodcasts[0];
    } else if (contentType === 'Video') {
        const mappedVideos = mapVideosToContentItems(
            [content as Video],
            allVideoSeries,
            allFeatured.videos
        );
        return mappedVideos[0];
    }

    return null;
};
