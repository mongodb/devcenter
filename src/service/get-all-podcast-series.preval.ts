import preval from 'next-plugin-preval';
import { Series } from '../interfaces/series';
import { getAllPodcastSeries } from './get-all-podcast-series';

export const getData = async (): Promise<Series[]> => {
    const data = await getAllPodcastSeries();
    return data;
};

export default preval(getData());
