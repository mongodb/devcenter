import preval from 'next-plugin-preval';
import { Series } from '../interfaces/series';
import { getAllArticleSeries } from './get-all-article-series';

export const getData = async (): Promise<Series[]> => {
    const data = await getAllArticleSeries();
    return data;
};

export default preval(getData());
