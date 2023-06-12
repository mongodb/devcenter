import preval from 'next-plugin-preval';
import { CS_getAllFeaturedContent } from '../api-requests/get-all-featured';
import { runMSW } from '../../mocks/run-msw';

export const getData = async (): Promise<any> => {
    await runMSW();
    const data = await CS_getAllFeaturedContent();
    return data;
};

export default preval(getData());
