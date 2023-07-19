import { ContentItem } from '../interfaces/content-item';
import { CS_getArticleBySlugFromCMS } from '../api-requests/get-articles';
import { CS_getIndustryEventBySlugFromCMS } from '../api-requests/get-industry-events';
import { getVideoBySlug } from './get-all-videos';
import { getPodcastBySlug } from './get-all-podcasts';
import allArticleSeries from './get-all-article-series.preval';
import allVideoSeries from './get-all-video-series.preval';
import allPodcastSeries from './get-all-podcast-series.preval';
import { CollectionType } from '../types/collection-type';
import {
    CS_mapPodcastsToContentItems,
    CS_mapVideosToContentItems,
    CS_mapArticlesToContentItems,
    CS_mapIndustryEventToContentItem,
    mapMongoDBTVShowsToContentItems,
} from './build-content-items';
import { CS_ArticleResponse } from '../interfaces/article';
import { CS_VideoResponse } from '../interfaces/video';
import { CS_PodcastResponse } from '../interfaces/podcast';
import { CS_IndustryEventsResponse } from '../interfaces/event';
import { getMongoDBTVShowBySlug } from '../api-requests/get-mongodb-tv-shows';
import { MongoDBTVShow } from '../interfaces/mongodb-tv';

export const getContentItemFromSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    slug = '/' + slug;
    let content:
        | CS_ArticleResponse
        | CS_VideoResponse
        | CS_PodcastResponse
        | CS_IndustryEventsResponse
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
        content = await CS_getIndustryEventBySlugFromCMS(slug);
        contentType = 'Event';
    } else {
        content = await CS_getArticleBySlugFromCMS(slug);
        contentType = 'Article';
    }

    if (!content) return null;

    if (contentType === 'Article') {
        const mappedArticles = await CS_mapArticlesToContentItems(
            [content as CS_ArticleResponse],
            allArticleSeries
        );
        console.log(mappedArticles.length);
        return mappedArticles[0];
    } else if (contentType === 'Podcast') {
        const mappedPodcasts = CS_mapPodcastsToContentItems(
            [content as CS_PodcastResponse],
            allPodcastSeries
        );
        return mappedPodcasts[0];
    } else if (contentType === 'Video') {
        const mappedVideos = isShow
            ? await mapMongoDBTVShowsToContentItems(
                  [content as MongoDBTVShow],
                  true
              )
            : CS_mapVideosToContentItems(
                  [content as CS_VideoResponse],
                  allVideoSeries
              );
        return mappedVideos[0];
    } else if (contentType === 'Event') {
        return CS_mapIndustryEventToContentItem(
            content as CS_IndustryEventsResponse
        );
    }

    return null;
};
