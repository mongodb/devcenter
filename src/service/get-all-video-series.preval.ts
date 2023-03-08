import preval from 'next-plugin-preval';
import { Series } from '../interfaces/series';
import { getAllVideoSeries } from './get-all-video-series';
import { runMSW } from '../../mocks/run-msw';

export const getData = async (): Promise<Series[]> => {
    await runMSW();
    const data = await getAllVideoSeries();
    return data;
};

export default preval(getData());
