import { STRAPI_CLIENT } from '../config/api-client';
import { Featured } from '../interfaces/featured';
import { getAllFeaturedFromAPI } from '../api-requests/get-all-featured';

export const getAllFeatured = async (): Promise<Featured> => {
    const allFeatured = await getAllFeaturedFromAPI(STRAPI_CLIENT);
    const featuredArticles = allFeatured?.articles.map(a => a.title);
    const featuredPodcasts = allFeatured?.podcasts.map(p => p.title);
    const featuredVideos = allFeatured?.videos.map(v => v.title);
    const featured = {
        articles: featuredArticles ? featuredArticles : [],
        podcasts: featuredPodcasts ? featuredPodcasts : [],
        videos: featuredVideos ? featuredVideos : [],
    };
    return featured;
};
