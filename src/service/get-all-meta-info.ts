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
import { getDistinctTags } from './get-distinct-tags';
import { TagType } from '../types/tag-type';

export const getAllMetaInfo = async (): Promise<MetaInfo[]> => {
    const existingTags = await getDistinctTags();
    // We have no use for tags that have no content associated with them
    const getExisting = (tags: MetaInfoResponse[], category: TagType) =>
        tags.filter(tag =>
            existingTags.find(
                ({ slug, type }) => slug === tag.slug && type === category
            )
        );
    const l2MetaInfoResponse = getExisting(
        await getAllL2ProductsMetaInfo(STRAPI_CLIENT),
        'L2Product'
    );

    const l1ProductsMetaInfo = parseMetaInfoResponseForL1(
        getExisting(await getAllL1ProductsMetaInfo(STRAPI_CLIENT), 'L1Product'),
        l2MetaInfoResponse
    );

    const l2ProductsMetaInfo = parseMetaInfoResponse(l2MetaInfoResponse);

    const programmingLanguagesMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllProgrammingLanguagesMetaInfo(STRAPI_CLIENT),
            'ProgrammingLanguage'
        )
    );
    const technologiesMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllTechnologiesMetaInfo(STRAPI_CLIENT),
            'Technology'
        )
    );
    const expertiseLevelsMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllExpertiseLevelsMetaInfo(STRAPI_CLIENT),
            'ExpertiseLevel'
        )
    );
    const contentTypesMetaInfo = parseMetaInfoResponse(
        getExisting(
            await getAllContentTypesMetaInfo(STRAPI_CLIENT),
            'ContentType'
        )
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

const getCTAs = (primary_cta: string | undefined): CTA[] =>
    primary_cta
        ? [
              {
                  text: 'Learn More',
                  url: primary_cta,
              },
          ]
        : [];
