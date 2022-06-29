import { getAllArticlesFromAPI } from '../api-requests/get-articles';
import { ContentItem } from '../interfaces/content-item';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { getAllVideos } from './get-all-videos';
import { getAllPodcasts } from './get-all-podcasts';
import { getAllFeatured } from './get-all-featured';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
} from './build-content-items';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcasts();
    const allVideos = await getAllVideos();
    const allArticles = await getAllArticlesFromAPI(STRAPI_CLIENT);
    const allFeatured = await getAllFeatured();
    /*
    series
     */
    const podcastSeries = await getAllPodcastSeries();
    const videoSeries = await getAllVideoSeries();
    const articleSeries = await getAllArticleSeries();
    const mappedPodcasts = mapPodcastsToContentItems(
        allPodcasts,
        podcastSeries,
        allFeatured.podcasts
    );
    const mappedVideos = mapVideosToContentItems(
        allVideos,
        videoSeries,
        allFeatured.videos
    );
    const mappedArticles = mapArticlesToContentItems(
        allArticles,
        articleSeries,
        allFeatured.articles
    );

    return mappedPodcasts.concat(mappedVideos).concat(mappedArticles).flat();
};
