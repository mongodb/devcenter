import preval from 'next-plugin-preval';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllFeaturedInfoFromAPI } from '../api-requests/get-all-featured';

export const getData = async (): Promise<any> => {
    const data = await getAllFeaturedInfoFromAPI(STRAPI_CLIENT);
    return data;
};

export default preval(getData());
