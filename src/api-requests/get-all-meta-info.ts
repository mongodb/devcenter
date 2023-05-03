import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { MetaInfoResponse } from '../interfaces/meta-info';
import { isStrapiClient } from '../utils/client-factory';

type metaInfoType =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes';

type __typename =
    | 'L1Product'
    | 'L2Product'
    | 'ProgrammingLanguage'
    | 'Technology'
    | 'ExpertiseLevel'
    | 'ContentType';

// NOTE: Failed to set type for data
/**
 * Adapt ContentStack' returned data into format consistent with Strapi
 */
const dataAdapter = (
    isStrapiClient: boolean,
    metaInfoType: metaInfoType,
    data: any,
    __typename: __typename
) => {
    let adaptedData = data[metaInfoType];

    if (isStrapiClient) {
        return adaptedData;
    }

    adaptedData = adaptedData.items;

    if (metaInfoType === 'l2Products') {
        return adaptedData.map((d: any) => ({
            ...d,
            __typename,
            l1_product: {
                l_1_product: { name: d.l1_product.edges[0].node.name },
            },
        }));
    }

    return adaptedData.map((d: any) => ({
        ...d,
        __typename,
    }));
};

export const getAllL1ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'> | UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query L1Products {
            l1Products: all_l1_products {
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

    const strapi_query = gql`
        query L1Products {
            l1Products @rest(type: "L1Product", path: "/l-1-products") {
                name
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
                documentation_link
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const { data }: ApolloQueryResult<{ l1Products: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'l1Products',
        data,
        'L1Product'
    ) as MetaInfoResponse[];

    return adaptedData;
};

export const getAllL2ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'> | UnderlyingClient<'ApolloGraphQL'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query L2_products {
            l2Products: all_l2_products {
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

    const strapi_query = gql`
        query L2Products {
            l2Products @rest(type: "L2Product", path: "/l-2-products") {
                name
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
                documentation_link
                l1_product {
                    l_1_product {
                        name
                    }
                }
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const { data }: ApolloQueryResult<{ l2Products: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'l2Products',
        data,
        'L2Product'
    ) as MetaInfoResponse[];

    return adaptedData;
};

export const getAllProgrammingLanguagesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query ProgrammingLanguages {
            programmingLanguages: all_programming_languages {
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

    const strapi_query = gql`
        query ProgrammingLanguages {
            programmingLanguages
                @rest(
                    type: "ProgrammingLanguage"
                    path: "/programming-languages"
                ) {
                name
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
                documentation_link
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const {
        data,
    }: ApolloQueryResult<{ programmingLanguages: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'programmingLanguages',
        data,
        'ProgrammingLanguage'
    ) as MetaInfoResponse[];

    return adaptedData;
};

/*

    | 'ContentType';
 */
export const getAllTechnologiesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query Technologies {
            technologies: all_technologies {
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

    const strapi_query = gql`
        query Technologies {
            technologies @rest(type: "Technology", path: "/technologies") {
                name
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
                documentation_link
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const { data }: ApolloQueryResult<{ technologies: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'technologies',
        data,
        'Technology'
    ) as MetaInfoResponse[];

    return adaptedData;
};

export const getAllExpertiseLevelsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query ExpertiseLevels {
            expertiseLevels: all_levels {
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                }
            }
        }
    `;

    const strapi_query = gql`
        query ExpertiseLevels {
            expertiseLevels @rest(type: "ExpertiseLevel", path: "/levels") {
                name: level
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const { data }: ApolloQueryResult<{ expertiseLevels: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'expertiseLevels',
        data,
        'ExpertiseLevel'
    ) as MetaInfoResponse[];

    return adaptedData;
};

export const getAllContentTypesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const cs_query = gql`
        query ContentTypes {
            contentTypes: all_content_types {
                items {
                    name: title
                    description
                    slug: calculated_slug
                    secondary_cta
                    primary_cta
                }
            }
        }
    `;

    const strapi_query = gql`
        query ContentTypes {
            contentTypes @rest(type: "ContentType", path: "/content-types") {
                name: content_type
                description
                slug: calculated_slug
                primary_cta
                secondary_cta
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query;

    const { data }: ApolloQueryResult<{ contentTypes: MetaInfoResponse[] }> =
        await client.query({ query });

    const adaptedData = dataAdapter(
        isStrapi,
        'contentTypes',
        data,
        'ContentType'
    ) as MetaInfoResponse[];

    return adaptedData;
};
