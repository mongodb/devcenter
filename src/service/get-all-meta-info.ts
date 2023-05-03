import { CS_CLIENT } from '../config/api-client';
import { MetaInfo, MetaInfoResponse } from '../interfaces/meta-info';
import {
    getAllContentTypesMetaInfo,
    getAllExpertiseLevelsMetaInfo,
    getAllL1ProductsMetaInfo,
    getAllL2ProductsMetaInfo,
    getAllProgrammingLanguagesMetaInfo,
    getAllTechnologiesMetaInfo,
} from '../api-requests/get-all-meta-info';
import { CTA } from '../components/hero/types';
import { getDistinctTags } from './get-distinct-tags';
import { TagType } from '../types/tag-type';

/**
 * Recursive function to perform nested structural comparison on two lists
 */
// const compareLists = (list1: any[], list2: any[]): boolean => {
//     if (list1.length !== list2.length) {
//         return false;
//     }

//     for (let i = 0; i < list1.length; i++) {
//         const item1 = list1[i];
//         const item2 = list2[i];

//         if (typeof item1 !== typeof item2) {
//             return false;
//         }

//         if (
//             Array.isArray(item1) &&
//             Array.isArray(item2) &&
//             !compareLists(item1, item2)
//         ) {
//             return false;
//         }

//         if (
//             typeof item1 === 'object' &&
//             typeof item2 === 'object' &&
//             !compareLists(Object.values(item1), Object.values(item2))
//         ) {
//             return false;
//         }

//         // non-nested type at this point
//         if (item1 !== item2) {
//             return false;
//         }
//     }

//     return true;
// };

// const parity_test_matched = async () => {
//     const l1_products = compareLists(
//         await getAllL1ProductsMetaInfo(CS_CLIENT),
//         await getAllL1ProductsMetaInfo(STRAPI_CLIENT)
//     );

//     if (!l1_products) console.log('[DEBUG] l1_products do not match');

//     const l2_products = compareLists(
//         await getAllL2ProductsMetaInfo(CS_CLIENT),
//         await getAllL2ProductsMetaInfo(STRAPI_CLIENT)
//     );

//     if (!l2_products) console.log('[DEBUG] l2_products do not match');

//     const programmingLanguages = compareLists(
//         await getAllProgrammingLanguagesMetaInfo(CS_CLIENT),
//         await getAllProgrammingLanguagesMetaInfo(STRAPI_CLIENT)
//     );

//     if (!programmingLanguages)
//         console.log('[DEBUG] programmingLanguages do not match');

//     const technologies = compareLists(
//         await getAllTechnologiesMetaInfo(CS_CLIENT),
//         await getAllTechnologiesMetaInfo(STRAPI_CLIENT)
//     );

//     if (!technologies) console.log('[DEBUG] technologies do not match');

//     const expertiseLevels = compareLists(
//         await getAllExpertiseLevelsMetaInfo(CS_CLIENT),
//         await getAllExpertiseLevelsMetaInfo(STRAPI_CLIENT)
//     );

//     if (!expertiseLevels) console.log('[DEBUG] expertiseLevels do not match');

//     const contentTypes = compareLists(
//         await getAllContentTypesMetaInfo(CS_CLIENT),
//         await getAllContentTypesMetaInfo(STRAPI_CLIENT)
//     );

//     if (!contentTypes) console.log('[DEBUG] contentTypes do not match');

//     return (
//         l1_products &&
//         l2_products &&
//         programmingLanguages &&
//         technologies &&
//         expertiseLevels &&
//         contentTypes
//     );
// };

export const getAllMetaInfo = async (): Promise<MetaInfo[]> => {
    const existingTags = await getDistinctTags();
    // We have no use for tags that have no content associated with them
    const getExisting = (tags: MetaInfoResponse[], category: TagType) =>
        tags.filter(tag =>
            existingTags.find(
                ({ slug, type }) => slug === tag.slug && type === category
            )
        );

    // if (!(await parity_test_matched())) {
    //     throw new Error('Parity Test for meta-info Failed.');
    // }

    const l2MetaInfoResponse = getExisting(
        await getAllL2ProductsMetaInfo(CS_CLIENT),
        'L2Product'
    );

    const l1ProductsMetaInfo = parseMetaInfoResponseForL1(
        getExisting(await getAllL1ProductsMetaInfo(CS_CLIENT), 'L1Product'),
        l2MetaInfoResponse
    );

    const l2ProductsMetaInfo = parseMetaInfoResponse(l2MetaInfoResponse);

    const programmingLanguagesMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllProgrammingLanguagesMetaInfo(CS_CLIENT),
            'ProgrammingLanguage'
        )
    );

    const technologiesMetaInfo = parseMetaInfoResponse(
        getExisting(await getAllTechnologiesMetaInfo(CS_CLIENT), 'Technology')
    );

    const expertiseLevelsMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllExpertiseLevelsMetaInfo(CS_CLIENT),
            'ExpertiseLevel'
        )
    );
    const contentTypesMetaInfo = parseMetaInfoResponse(
        getExisting(await getAllContentTypesMetaInfo(CS_CLIENT), 'ContentType')
    );
    return l1ProductsMetaInfo
        .concat(l2ProductsMetaInfo)
        .concat(programmingLanguagesMetaInfo)
        .concat(technologiesMetaInfo)
        .concat(expertiseLevelsMetaInfo)
        .concat(contentTypesMetaInfo)
        .flat();
};

const parseMetaInfoResponse = (
    metaInfoResponses: MetaInfoResponse[]
): MetaInfo[] => {
    const parsedInfo: MetaInfo[] = [];
    metaInfoResponses.forEach(m => {
        parsedInfo.push(getMetaInfo(m));
    });
    return parsedInfo;
};

const parseMetaInfoResponseForL1 = (
    l1: MetaInfoResponse[],
    l2: MetaInfoResponse[]
): MetaInfo[] => {
    const parsedInfo: MetaInfo[] = [];
    l1.forEach(l1Item => {
        const info = getMetaInfo(l1Item);
        info.topics = getL2Topics(l1Item, l2);
        parsedInfo.push(info);
    });

    return parsedInfo;
};

const getMetaInfo = (m: MetaInfoResponse): MetaInfo => {
    return {
        category: m.__typename,
        tagName: m.name,
        description: m.description ? m.description : '',
        slug: m.slug,
        ctas: getCTAs(m.primary_cta),
        topics: [],
        documentationLink: m.documentation_link || '',
    };
};

const getL2Topics = (l1Item: MetaInfoResponse, l2: MetaInfoResponse[]) => {
    const topics: MetaInfoResponse[] = [];
    l2.forEach(l2Item => {
        const l1Product = l2Item.l1_product?.l_1_product;
        if (l1Product) {
            if (
                l1Product.name &&
                l1Product.name.toLowerCase() === l1Item.name.toLowerCase()
            ) {
                topics.push(l2Item);
            }
        }
    });
    return parseMetaInfoResponse(topics);
};

const getCTAs = (primary_cta: string | undefined): CTA[] =>
    primary_cta
        ? [
              {
                  text: 'Learn More',
                  url: primary_cta,
              },
          ]
        : [];
