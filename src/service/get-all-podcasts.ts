import { STRAPI_CLIENT } from '../config/api-client';
import { Podcast } from '../interfaces/podcast';
import getAllPodcastsFromAPI from '../api-requests/get-all-podcasts';

export const getAllPodcasts = async (): Promise<Podcast[]> => {
    const podcasts = await getAllPodcastsFromAPI(STRAPI_CLIENT);
    return podcasts;
};
