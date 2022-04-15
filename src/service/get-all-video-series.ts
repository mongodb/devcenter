import { Series } from '../interfaces/series';
import { STRAPI_CLIENT } from '../config/api-client';
import { parseStrapiSeriesResponse } from './parse-strapi-series-response';
import { getAllVideoSeriesFromAPI } from '../api-requests/get-video-series';

export const getAllVideoSeries = async (): Promise<Series[]> => {
    const data = await getAllVideoSeriesFromAPI(STRAPI_CLIENT);
    return parseStrapiSeriesResponse(data, 'video');
};
