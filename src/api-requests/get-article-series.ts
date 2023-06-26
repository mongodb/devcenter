import { getAllArticleSeriesQuery } from '../graphql/article-series';
import { CS_SeriesResponse } from '../interfaces/series';
import { fetchAll, getClient } from './contentstack_utils';

export const CS_getAllArticleSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const client = getClient('production');
    const articlesSeries = (await fetchAll(
        getAllArticleSeriesQuery,
        'articleSeries',
        client
    )) as CS_SeriesResponse[];

    return articlesSeries;
};
