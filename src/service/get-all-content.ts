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
} from './build-content-items';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcasts();
    const allVideos = await getAllVideos();
    const allArticles = await getAllArticlesFromAPI(STRAPI_CLIENT);
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

    return mappedPodcasts.concat(mappedVideos).concat(mappedArticles).flat();
};
