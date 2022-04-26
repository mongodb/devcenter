import { Series } from '../interfaces/series';
import { getAllArticleSeriesFromAPI } from '../api-requests/get-article-series';
import { STRAPI_CLIENT } from '../config/api-client';
import { parseStrapiSeriesResponse } from './parse-strapi-series-response';

export const getAllArticleSeries = async (): Promise<Series[]> => {
    const data = await getAllArticleSeriesFromAPI(STRAPI_CLIENT);
    return parseStrapiSeriesResponse(data, 'article');
};
