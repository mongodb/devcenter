import { Series } from '../interfaces/series';
import { STRAPI_CLIENT } from '../config/api-client';
import { parseStrapiSeriesResponse } from './parse-strapi-series-response';
import { getAllPodcastSeriesFromAPI } from '../api-requests/get-podcast-series';

export const getAllPodcastSeries = async (): Promise<Series[]> => {
    const data = await getAllPodcastSeriesFromAPI(STRAPI_CLIENT);
    return parseStrapiSeriesResponse(data, 'podcast');
};
