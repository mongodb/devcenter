import { STRAPI_CLIENT } from '../config/api-client';
import { MetaInfo } from '../interfaces/meta-info';
import {
    getAllContentTypesMetaInfo,
    getAllExpertiseLevelsMetaInfo,
    getAllL1ProductsMetaInfo,
    getAllL2ProductsMetaInfo,
    getAllProgrammingLanguagesMetaInfo,
    getAllTechnologiesMetaInfo,
} from '../api-requests/get-all-meta-info';

import {
    parseMetaInfoResponse,
    parseMetaInfoResponseForL1,
} from './get-all-meta-info';

// Similar to getAllMetaInfo, but doesn't filter out tags without content associated.
export const getAllTags = async (): Promise<MetaInfo[]> => {
    const l2MetaInfoResponse = await getAllL2ProductsMetaInfo(STRAPI_CLIENT);

    const l1ProductsMetaInfo = parseMetaInfoResponseForL1(
        await getAllL1ProductsMetaInfo(STRAPI_CLIENT),
        l2MetaInfoResponse
    );

    const l2ProductsMetaInfo = parseMetaInfoResponse(l2MetaInfoResponse);

    const programmingLanguagesMetaInfo = parseMetaInfoResponse(
        await getAllProgrammingLanguagesMetaInfo(STRAPI_CLIENT)
    );
    const technologiesMetaInfo = parseMetaInfoResponse(
        await getAllTechnologiesMetaInfo(STRAPI_CLIENT)
    );
    const expertiseLevelsMetaInfo = parseMetaInfoResponse(
        await getAllExpertiseLevelsMetaInfo(STRAPI_CLIENT)
    );
    const contentTypesMetaInfo = parseMetaInfoResponse(
        await getAllContentTypesMetaInfo(STRAPI_CLIENT)
    );
    return l1ProductsMetaInfo
        .concat(l2ProductsMetaInfo)
        .concat(programmingLanguagesMetaInfo)
        .concat(technologiesMetaInfo)
        .concat(expertiseLevelsMetaInfo)
        .concat(contentTypesMetaInfo)
        .flat();
};
