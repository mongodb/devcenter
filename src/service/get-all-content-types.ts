import { STRAPI_CLIENT } from '../config/api-client';
import getAllContentTypesFromAPI from '../api-requests/get-all-content-types';
import { ContentTypeTag } from '../interfaces/tag-type-response';

export const getAllContentTypes = async (): Promise<ContentTypeTag[]> => {
    const data = await getAllContentTypesFromAPI(STRAPI_CLIENT);
    return data;
};
