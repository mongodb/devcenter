import { CS_getAllArticlesFromCMS } from '../api-requests/get-articles';
import { ContentItem } from '../interfaces/content-item';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { getAllVideos } from './get-all-videos';
import { getAllPodcasts } from './get-all-podcasts';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    CS_mapArticlesToContentItems,
    mapEventsToContentItems,
} from './build-content-items';
import { getAllCommunityEvents } from './get-all-events';
import { CS_getAllIndustryEventsFromCMS } from '../api-requests/get-industry-events';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcasts();
    const allVideos = await getAllVideos();
    const allArticles = await CS_getAllArticlesFromCMS();
    const allCommunityEvents = await getAllCommunityEvents();
    const allIndustryEvents = await CS_getAllIndustryEventsFromCMS();
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
    const mappedArticles = CS_mapArticlesToContentItems(
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
