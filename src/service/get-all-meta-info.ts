import {
    MetaInfo,
    CS_MetaInfoResponse,
    contentTypeUIDtoTagType,
} from '../interfaces/meta-info';
import { CS_getMetaInfoFromCMS } from '../api-requests/get-all-meta-info';
import { CTA } from '../components/hero/types';
import { getDistinctTags } from './get-distinct-tags';
import { TagType } from '../types/tag-type';

export const getAllMetaInfo = async (): Promise<MetaInfo[]> => {
    const existingTags = await getDistinctTags();
    // We have no use for tags that have no content associated with them
    const getExisting = (tags: CS_MetaInfoResponse[], category: TagType) =>
        tags.filter(tag =>
            existingTags.find(
                ({ slug, type }) => slug === tag.slug && type === category
            )
        );
    const l2MetaInfoResponse = getExisting(
        await CS_getMetaInfoFromCMS('l2_products'),
        'L2Product'
    );

    const l1ProductsMetaInfo = parseMetaInfoResponseForL1(
        getExisting(await CS_getMetaInfoFromCMS('l1_products'), 'L1Product'),
        l2MetaInfoResponse
    );

    const l2ProductsMetaInfo = parseMetaInfoResponse(l2MetaInfoResponse);

    const programmingLanguagesMetaInfo = parseMetaInfoResponse(
        getExisting(
            await CS_getMetaInfoFromCMS('programming_languages'),
            'ProgrammingLanguage'
        )
    );
    const technologiesMetaInfo = parseMetaInfoResponse(
        getExisting(await CS_getMetaInfoFromCMS('technologies'), 'Technology')
    );
    const expertiseLevelsMetaInfo = parseMetaInfoResponse(
        getExisting(await CS_getMetaInfoFromCMS('levels'), 'ExpertiseLevel')
    );
    const contentTypesMetaInfo = parseMetaInfoResponse(
        getExisting(await CS_getMetaInfoFromCMS('content_types'), 'ContentType')
    );
    return l1ProductsMetaInfo
        .concat(l2ProductsMetaInfo)
        .concat(programmingLanguagesMetaInfo)
        .concat(technologiesMetaInfo)
        .concat(expertiseLevelsMetaInfo)
        .concat(contentTypesMetaInfo)
        .flat();
};

export const parseMetaInfoResponse = (
    metaInfoResponses: CS_MetaInfoResponse[]
): MetaInfo[] => {
    const parsedInfo: MetaInfo[] = [];
    metaInfoResponses.forEach(m => {
        parsedInfo.push(getMetaInfo(m));
    });
    return parsedInfo;
};

export const parseMetaInfoResponseForL1 = (
    l1: CS_MetaInfoResponse[],
    l2: CS_MetaInfoResponse[]
): MetaInfo[] => {
    const parsedInfo: MetaInfo[] = [];
    l1.forEach(l1Item => {
        const info = getMetaInfo(l1Item);
        info.topics = getL2Topics(l1Item, l2);
        parsedInfo.push(info);
    });

    return parsedInfo;
};

const getMetaInfo = (m: CS_MetaInfoResponse): MetaInfo => {
    return {
        category: contentTypeUIDtoTagType.get(
            m.system.content_type_uid
        ) as TagType,
        tagName: m.title,
        description: m.description ? m.description : '',
        slug: m.slug,
        ctas: getCTAs(m.primary_cta),
        topics: [],
        documentationLink: m.documentation_link || '',
    };
};

const getL2Topics = (
    l1Item: CS_MetaInfoResponse,
    l2: CS_MetaInfoResponse[]
) => {
    const topics: CS_MetaInfoResponse[] = [];
    l2.forEach(l2Item => {
        const l1Product = l2Item.l1_productConnection?.edges[0].node;
        if (l1Product) {
            if (
                l1Product.title &&
                l1Product.title.toLowerCase() === l1Item.title.toLowerCase()
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
