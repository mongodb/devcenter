import { CS_SeriesResponse } from '../interfaces/series';
import { fetchAll, getClient } from './contentstack_utils';
import { getAllVideoSeriesQuery } from '../graphql/video-series';

export const CS_getAllVideoSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const client = getClient('production');
    const videoSeries = (await fetchAll(
        getAllVideoSeriesQuery,
        'videoSeries',
        client
    )) as CS_SeriesResponse[];

    return videoSeries;
};
