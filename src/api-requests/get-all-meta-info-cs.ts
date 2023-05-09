import { UnderlyingClient } from '../types/client-factory';
import { gql } from '@apollo/client';
import { MetaInfoResponse } from '../interfaces/meta-info';
import { CSEdges, CSMetaInfoResponse } from '../interfaces/contentstack';
import { extractFieldsFromNode, fetchAll } from './utils';
import { TagType } from '../types/tag-type';

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
    const query = gql`
        query L1Products($skip: Int = 0) {
            l1Products: all_l1_products(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                    documentation_link
                }
            }
        }
    `;

    const l1Products = (await fetchAll(
        client,
        query,
        'l1Products'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(l1Products, 'L1Product');
    return data;
};

export const getAllL2ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
        query L2_products($skip: Int = 0) {
            l2Products: all_l2_products(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    primary_cta
                    secondary_cta
                    documentation_link
                    l1_product: l1_productConnection {
                        edges {
                            node {
                                ... on L1Products {
                                    name: title
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const l2Products = (await fetchAll(
        client,
        query,
        'l2Products'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(l2Products, 'L2Product');
    return data;
};

export const getAllProgrammingLanguagesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
        query ProgrammingLanguages($skip: Int = 0) {
            programmingLanguages: all_programming_languages(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                    documentation_link
                }
            }
        }
    `;

    const programmingLanguages = (await fetchAll(
        client,
        query,
        'programmingLanguages'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(programmingLanguages, 'ProgrammingLanguage');
    return data;
};

/*

    | 'ContentType';
 */
export const getAllTechnologiesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
        query Technologies($skip: Int = 0) {
            technologies: all_technologies(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                    documentation_link
                }
            }
        }
    `;

    const technologies = (await fetchAll(
        client,
        query,
        'technologies'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(technologies, 'Technology');
    return data;
};

export const getAllExpertiseLevelsMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
        query ExpertiseLevels($skip: Int = 0) {
            expertiseLevels: all_levels(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                    documentation_link
                }
            }
        }
    `;

    const expertiseLevels = (await fetchAll(
        client,
        query,
        'expertiseLevels'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(expertiseLevels, 'ExpertiseLevel');
    return data;
};

export const getAllContentTypesMetaInfo = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
        query ContentTypes($skip: Int = 0) {
            contentTypes: all_content_types(skip: $skip) {
                total
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                    documentation_link
                }
            }
        }
    `;

    const contentTypes = (await fetchAll(
        client,
        query,
        'contentTypes'
    )) as CSMetaInfoResponse[];

    const data = formatResponses(contentTypes, 'ContentType');
    return data;
};
