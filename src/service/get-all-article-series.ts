import { CS_SeriesResponse, Series } from '../interfaces/series';
import { CS_getAllArticleSeriesFromAPI } from '../api-requests/get-article-series';
import { CS_parseSeriesResponse } from './parse-series-response';

export const getAllArticleSeries = async (): Promise<Series[]> => {
    const data: CS_SeriesResponse[] = await CS_getAllArticleSeriesFromAPI();
    return CS_parseSeriesResponse(data);
};
