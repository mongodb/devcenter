import { UnderlyingClient } from '../types/client-factory';
import { DocumentNode } from 'graphql';
import { CSEdges, CSSEO } from '../interfaces/contentstack';
import { SEO } from '../interfaces/seo';
import { GenericTagTypeResponse } from '../interfaces/tag-type-response';
import { OtherTags } from '../interfaces/other-tags';

type gqlParents =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes'
    | 'podcasts'
    | 'videos';

export const fetchAll = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    query: DocumentNode,
    gqlParentName: gqlParents,
    vars?: { [key: string]: any }
) => {
    // expect all incoming cs_query already has total
    const response: any = await client.query({ query, variables: vars });

    const { total } = response.data[gqlParentName];

    let allItems: { [key: string]: any }[] = [];

    while (allItems.length < total) {
        const variables = { ...vars, skip: allItems.length };
        const res: any = await client.query({ query, variables });
        const { items } = res.data[gqlParentName];

        allItems = allItems.concat(items);
    }

    return allItems;
};

/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNode = (
    singleDataOfField: CSEdges<any>,
    fields: [string, string][] | string[]
) => {
    if (!singleDataOfField) {
        return null;
    }

    const projectedData: { [key: string]: any } = {};

    if (singleDataOfField.edges.length === 0) {
        return null;
    }

    const data = singleDataOfField.edges[0].node;
    const sourceAndProjectFieldsAreDifferent = Array.isArray(fields[0]);

    if (sourceAndProjectFieldsAreDifferent) {
        for (const [sourceField, projectedField] of fields) {
            projectedData[projectedField] = data[sourceField];
        }

        return projectedData;
    }

    // source field and project field are the same
    for (const field of fields) {
        projectedData[field as string] = data[field as string];
    }

    return projectedData as GenericTagTypeResponse;
};
/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNodes = (
    singleDataOfField: CSEdges<any>,
    fields: [string, string][] | string[]
) => {
    if (!singleDataOfField) {
        return [];
    }

    const projectedDataList: { [key: string]: any }[] = [];

    if (singleDataOfField.edges.length === 0) {
        return [];
    }

    for (const { node } of singleDataOfField.edges) {
        const projectedData: { [key: string]: any } = {};
        const sourceAndProjectFieldsAreDifferent = Array.isArray(fields[0]);
        if (sourceAndProjectFieldsAreDifferent) {
            for (const [sourceField, projectedField] of fields) {
                projectedData[projectedField] = node[sourceField];
            }
        } else {
            // source field and project field are the same
            for (const field of fields) {
                projectedData[field as string] = node[field as string];
            }
        }

        projectedDataList.push(projectedData);
    }

    return projectedDataList as GenericTagTypeResponse[];
};

/**
 * This function will treat fields with [] and {} as non-empty, but SEO
 * after formatting only has "" and null values and thus work
 */
const isEmptySEO = (seo: { [key: string]: any }) => {
    for (const value of Object.values(seo)) {
        if (value) {
            return false;
        }
    }

    return true;
};

export const getSEO = (seoData: CSSEO): SEO => {
    let seo: { [key: string]: any } = {};

    seo = {
        ...seoData,
        og_image: extractFieldsFromNode(seoData.og_image as CSEdges<any>, [
            'url',
        ]),
        twitter_image: extractFieldsFromNode(
            seoData.twitter_image as CSEdges<any>,
            ['url']
        ),
    };

    delete seo.__typename;

    return (!isEmptySEO(seo) ? seo : null) as SEO;
};

export const getOtherTags = (otherTagsData: any) => {
    if (!otherTagsData) {
        return null;
    }

    const otherTags = {
        spokenLanguage: extractFieldsFromNode(otherTagsData.spokenLanguage, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        expertiseLevel: extractFieldsFromNode(otherTagsData.expertiseLevel, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        authorType: extractFieldsFromNode(otherTagsData.authorType, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
    };

    if (
        otherTags.spokenLanguage ||
        otherTags.expertiseLevel ||
        otherTags.authorType
    ) {
        return otherTags as OtherTags;
    }

    return null;
};
