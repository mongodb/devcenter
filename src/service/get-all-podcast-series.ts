import { CS_SeriesResponse, Series } from '../interfaces/series';
import { CS_parseSeriesResponse } from './parse-series-response';
import { CS_getAllPodcastSeriesFromAPI } from '../api-requests/get-podcast-series';

export const getAllPodcastSeries = async (): Promise<Series[]> => {
    const data: CS_SeriesResponse[] = await CS_getAllPodcastSeriesFromAPI();
    return CS_parseSeriesResponse(data);
};
