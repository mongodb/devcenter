import { MetaInfo } from '../interfaces/meta-info';
import { CS_getMetaInfoFromCMS } from '../api-requests/get-all-meta-info';

import {
    parseMetaInfoResponse,
    parseMetaInfoResponseForL1,
} from './get-all-meta-info';

// Similar to getAllMetaInfo, but doesn't filter out tags without content associated.
export const getAllTags = async (): Promise<MetaInfo[]> => {
    const l2MetaInfoResponse = await CS_getMetaInfoFromCMS('l2_products');

    const l1ProductsMetaInfo = parseMetaInfoResponseForL1(
        await CS_getMetaInfoFromCMS('l1_products'),
        l2MetaInfoResponse
    );

    const l2ProductsMetaInfo = parseMetaInfoResponse(l2MetaInfoResponse);

    const programmingLanguagesMetaInfo = parseMetaInfoResponse(
        await CS_getMetaInfoFromCMS('programming_languages')
    );
    const technologiesMetaInfo = parseMetaInfoResponse(
        await CS_getMetaInfoFromCMS('technologies')
    );
    const expertiseLevelsMetaInfo = parseMetaInfoResponse(
        await CS_getMetaInfoFromCMS('levels')
    );
    const contentTypesMetaInfo = parseMetaInfoResponse(
        await CS_getMetaInfoFromCMS('content_types')
    );
    return l1ProductsMetaInfo
        .concat(l2ProductsMetaInfo)
        .concat(programmingLanguagesMetaInfo)
        .concat(technologiesMetaInfo)
        .concat(expertiseLevelsMetaInfo)
        .concat(contentTypesMetaInfo)
        .flat();
};
