import preval from 'next-plugin-preval';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllFeaturedInfoFromAPI } from '../api-requests/get-all-featured';
import { runMSW } from '../../mocks/run-msw';

export const getData = async (): Promise<any> => {
    await runMSW();
    const data = await getAllFeaturedInfoFromAPI(STRAPI_CLIENT);
    return data;
};

export default preval(getData());
