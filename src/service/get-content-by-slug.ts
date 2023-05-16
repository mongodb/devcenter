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
    mapMongoDBTVShowsToContentItems,
} from './build-content-items';
import { Article } from '../interfaces/article';
import { Video } from '../interfaces/video';
import { Podcast } from '../interfaces/podcast';
import { IndustryEvent } from '../interfaces/event';
import { getMongoDBTVShowBySlug } from '../api-requests/get-mongodb-tv-shows';
import { MongoDBTVShow } from '../interfaces/mongodb-tv';

export const getContentItemFromSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    slug = '/' + slug;
    let content:
        | Article
        | Video
        | Podcast
        | IndustryEvent
        | MongoDBTVShow
        | null = null;
    let contentType: CollectionType | null = null;

    let isShow = false;

    // videos and MongoDBTV shows always starts with /videos
    if (slug.startsWith('/videos')) {
        const mbdtvContent = await getMongoDBTVShowBySlug(slug);
        // We currently only want to create pages for MongoDB TV shows that have not yet aired.
        if (mbdtvContent && mbdtvContent.upcoming) {
            isShow = true;
            content = mbdtvContent;
        } else {
            // If not an upcoming show, we want to resort to the corresponding CMS entry.
            content = await getVideoBySlug(slug);
            if (!content && mbdtvContent) {
                // If there is no corresponding CMS entry, use the show even though it is a rerun.
                isShow = true;
                content = mbdtvContent;
            }
        }
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
        const mappedVideos = isShow
            ? await mapMongoDBTVShowsToContentItems(
                  [content as MongoDBTVShow],
                  true
              )
            : await mapVideosToContentItems([content as Video], allVideoSeries);
        return mappedVideos[0];
    } else if (contentType === 'Event') {
        return mapIndustryEventToContentItem(content as IndustryEvent);
    }

    return null;
};
