import { getAllPodcastSeriesQuery } from '../graphql/podcast-series';
import { CS_SeriesResponse } from '../interfaces/series';
import { fetchAll, getClient } from './contentstack_utils';

export const CS_getAllPodcastSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const client = getClient('production');
    const podcastSeries = (await fetchAll(
        getAllPodcastSeriesQuery,
        'podcastSeries',
        client
    )) as CS_SeriesResponse[];

    return podcastSeries;
};
