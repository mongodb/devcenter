import preval from 'next-plugin-preval';
import { Series } from '../interfaces/series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { runMSW } from '../../mocks/run-msw';

export const getData = async (): Promise<Series[]> => {
    await runMSW();
    const data = await getAllPodcastSeries();
    return data;
};

export default preval(getData());
