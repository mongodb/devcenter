import { UnderlyingClient } from '../types/client-factory';
import { MetaInfoResponse } from '../interfaces/meta-info';
import { CSEdges, CSMetaInfoResponse } from '../interfaces/contentstack';
import { extractFieldsFromNode, fetchAll } from './utils';
import { TagType } from '../types/tag-type';
import {
    allL1ProductsQuery,
    allL2ProductsQuery,
    allProgrammingLanguagesQuery,
    allTechnologiesQuery,
    allExpertiseLevelsQuery,
    allContentTypesQuery,
} from '../graphql/meta-info';

const formatResponses = (
    csMetaResponses: CSMetaInfoResponse[],
    metaInfoType: TagType
): MetaInfoResponse[] => {
    return csMetaResponses.map(r => {
        const metaResponse: any = { ...r, __typename: metaInfoType };

        if ('l1_product' in metaResponse) {
            metaResponse.l1_product = {
                l_1_product: extractFieldsFromNode(
                    r.l1_product as CSEdges<any>,
                    ['name']
                ),
            };
        }

        return metaResponse;
    });
};

export const getAllL1ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const l1Products = (await fetchAll(
        client,
        allL1ProductsQuery,
        'l1Products'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(l1Products, 'L1Product');
    return data;
};

export const getAllL2ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const l2Products = (await fetchAll(
        client,
        allL2ProductsQuery,
        'l2Products'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(l2Products, 'L2Product');
    return data;
};

export const getAllProgrammingLanguagesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const programmingLanguages = (await fetchAll(
        client,
        allProgrammingLanguagesQuery,
        'programmingLanguages'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(programmingLanguages, 'ProgrammingLanguage');
    return data;
};

export const getAllTechnologiesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const technologies = (await fetchAll(
        client,
        allTechnologiesQuery,
        'technologies'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(technologies, 'Technology');
    return data;
};

export const getAllExpertiseLevelsMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const expertiseLevels = (await fetchAll(
        client,
        allExpertiseLevelsQuery,
        'expertiseLevels'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(expertiseLevels, 'ExpertiseLevel');
    return data;
};

export const getAllContentTypesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const contentTypes = (await fetchAll(
        client,
        allContentTypesQuery,
        'contentTypes'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(contentTypes, 'ContentType');
    return data;
};
