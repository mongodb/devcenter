import preval from 'next-plugin-preval';
import { Series } from '../interfaces/series';
import { getAllVideoSeries } from './get-all-video-series';
import '../../mocks/run-msw';

export const getData = async (): Promise<Series[]> => {
    const data = await getAllVideoSeries();
    return data;
};

export default preval(getData());
