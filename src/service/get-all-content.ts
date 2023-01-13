import { getAllArticlesFromAPI } from '../api-requests/get-articles';
import { ContentItem } from '../interfaces/content-item';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { getAllVideos } from './get-all-videos';
import { getAllPodcasts } from './get-all-podcasts';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
    mapEventsToContentItems,
} from './build-content-items';
import { getAllCommunityEvents, getAllIndustryEvents } from './get-all-events';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcasts();
    const allVideos = await getAllVideos();
    const allArticles = await getAllArticlesFromAPI(STRAPI_CLIENT);
    const allCommunityEvents = await getAllCommunityEvents();
    const allIndustryEvents = await getAllIndustryEvents();
    /*
    series
     */

    const podcastSeries = await getAllPodcastSeries();
    const videoSeries = await getAllVideoSeries();
    const articleSeries = await getAllArticleSeries();
    const mappedPodcasts = mapPodcastsToContentItems(
        allPodcasts,
        podcastSeries
    );
    const mappedVideos = mapVideosToContentItems(allVideos, videoSeries);
    const mappedArticles = mapArticlesToContentItems(
        allArticles,
        articleSeries
    );
    const mappedEvents = mapEventsToContentItems(
        allCommunityEvents,
        allIndustryEvents
    );

    return mappedPodcasts
        .concat(mappedVideos)
        .concat(mappedArticles)
        .concat(mappedEvents)
        .flat();
};
