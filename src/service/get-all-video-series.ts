import { CS_SeriesResponse, Series } from '../interfaces/series';
import { CS_parseSeriesResponse } from './parse-series-response';
import { CS_getAllVideoSeriesFromAPI } from '../api-requests/get-video-series';

export const getAllVideoSeries = async (): Promise<Series[]> => {
    const data: CS_SeriesResponse[] = await CS_getAllVideoSeriesFromAPI();
    return CS_parseSeriesResponse(data);
};
