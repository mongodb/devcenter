import { STRAPI_CLIENT } from '../config/api-client';
import { ContentItem } from '../interfaces/content-item';
import { getArticleBySlugFromAPI } from '../api-requests/get-articles';
import { getIndustryEventBySlugFromAPI } from '../api-requests/get-industry-events';
import { getVideoBySlug } from '../service/get-all-videos';
import { getPodcastBySlug } from '../service/get-all-podcasts';
import allArticleSeries from './get-all-article-series.preval';
import allVideoSeries from './get-all-video-series.preval';
import allPodcastSeries from './get-all-podcast-series.preval';
import { CollectionType } from '../types/collection-type';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
    mapIndustryEventToContentItem,
} from './build-content-items';
import { Article } from '../interfaces/article';
import { Video } from '../interfaces/video';
import { Podcast } from '../interfaces/podcast';
import { IndustryEvent } from '../interfaces/event';

export const getContentItemFromSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    slug = '/' + slug;
    let content: Article | Video | Podcast | IndustryEvent | null = null;
    let contentType: CollectionType | null = null;

    console.log('SLUG', slug);

    // videos always starts with /videos
    if (slug.startsWith('/videos')) {
        content = await getVideoBySlug(slug);
        contentType = 'Video';
    } else if (slug.startsWith('/podcasts')) {
        content = await getPodcastBySlug(slug);
        contentType = 'Podcast';
    } else if (slug.startsWith('/events')) {
        content = await getIndustryEventBySlugFromAPI(STRAPI_CLIENT, slug);
        contentType = 'Event';
    } else {
        content = await getArticleBySlugFromAPI(STRAPI_CLIENT, slug);
        contentType = 'Article';
    }

    if (!content) return null;

    if (contentType === 'Article') {
        const mappedArticles = mapArticlesToContentItems(
            [content as Article],
            allArticleSeries
        );
        return mappedArticles[0];
    } else if (contentType === 'Podcast') {
        const mappedPodcasts = mapPodcastsToContentItems(
            [content as Podcast],
            allPodcastSeries
        );
        return mappedPodcasts[0];
    } else if (contentType === 'Video') {
        const mappedVideos = mapVideosToContentItems(
            [content as Video],
            allVideoSeries
        );
        return mappedVideos[0];
    } else if (contentType === 'Event') {
        return mapIndustryEventToContentItem(content as IndustryEvent);
    }

    return null;
};
