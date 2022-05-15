import { STRAPI_CLIENT } from '../config/api-client';
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
import { ITopicCard } from '../components/topic-card/types';

export const getAllMetaInfo = async (): Promise<MetaInfo[]> => {
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
        ctas: getCTAs(m.primary_cta, m.secondary_cta),
        topics: [],
    };
};

const getL2Topics = (l1Item: MetaInfoResponse, l2: MetaInfoResponse[]) => {
    const topics: ITopicCard[] = [];
    l2.forEach(l2Item => {
        const l1Product = l2Item.l1_product?.l_1_product;
        if (l1Product) {
            if (
                l1Product.name &&
                l1Product.name.toLowerCase() === l1Item.name.toLowerCase()
            ) {
                topics.push({
                    title: l2Item.name,
                    icon: 'mdb_backup',
                    href: l2Item.slug,
                });
            }
        }
    });
    return topics;
};

const getCTAs = (
    primary_cta: string | undefined,
    secondary_cta: string | undefined
): CTA[] => {
    if (primary_cta && secondary_cta) {
        return [
            {
                text: 'Primary CTA',
                url: primary_cta,
            },
            {
                text: 'Secondary CTA',
                url: secondary_cta,
            },
        ];
    }
    if (primary_cta) {
        return [
            {
                text: 'Primary CTA',
                url: primary_cta,
            },
        ];
    }
    if (secondary_cta) {
        return [
            {
                text: 'Secondary CTA',
                url: secondary_cta,
            },
        ];
    }
    return [];
};
