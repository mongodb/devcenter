import { STRAPI_CLIENT } from '../config/api-client';
import { Featured, FeaturedItem } from '../interfaces/featured';
import { getAllFeaturedFromAPI } from '../api-requests/get-all-featured';

export const getAllFeatured = async (): Promise<Featured> => {
    const allFeatured = await getAllFeaturedFromAPI(STRAPI_CLIENT);
    let featuredArticles: FeaturedItem[] = [];
    let featuredPodcasts: FeaturedItem[] = [];
    let featuredVideos: FeaturedItem[] = [];
    allFeatured.forEach(topic => {
        featuredArticles = featuredArticles.concat(topic.articles);
        featuredPodcasts = featuredPodcasts.concat(topic.podcasts);
        featuredVideos = featuredVideos.concat(topic.videos);
    });
    const featured = {
        articles: featuredArticles.map(({ title }) => title),
        podcasts: featuredPodcasts.map(({ title }) => title),
        videos: featuredVideos.map(({ title }) => title),
    };
    return featured;
};
