import { CS_SeriesResponse, Series } from '../interfaces/series';
import { CS_getAllArticleSeriesFromAPI } from '../api-requests/get-article-series';
import { CS_parseStrapiSeriesResponse } from './parse-strapi-series-response';

export const getAllArticleSeries = async (): Promise<Series[]> => {
    const data: CS_SeriesResponse[] = await CS_getAllArticleSeriesFromAPI();
    return CS_parseStrapiSeriesResponse(data);
};
