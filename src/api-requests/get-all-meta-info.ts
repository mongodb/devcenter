import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { MetaInfoResponse } from '../interfaces/meta-info';
import { isStrapiClient } from '../utils/client-factory';
import { TagType } from '../types/tag-type';
import { insertTypename, extractFieldsFromNode, areTheSame } from './utils';
import { CS_CLIENT, STRAPI_CLIENT } from '../config/api-client';

type metaInfoType =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes';

/**
 * Ensure CS response is compatible with original Strapi format
 */
const formatResponse = (
    isStrapiClient: boolean,
    metaInfoType: metaInfoType,
    data: any,
    __typename: TagType
) => {
    let formattedData = data[metaInfoType];

    if (isStrapiClient) {
        return formattedData;
    }

    formattedData = formattedData.items;

    // explicitly define default when falsy
    formattedData = formattedData.map((d: any) => ({
        name: d.name ? d.name : null,
        description: d.description ? d.description : null,
        slug: d.slug ? d.slug : null,
        secondary_cta: d.secondary_cta ? d.secondary_cta : '',
        primary_cta: d.primary_cta ? d.primary_cta : '',
        documentation_link: d.documentation_link ? d.documentation_link : null,
    }));

    if (metaInfoType === 'l2Products') {
        formattedData = formattedData.map((d: any) => ({
            ...d,
            l1_product: {
                l_1_product: extractFieldsFromNode(d.l1_product, ['name']),
            },
        }));
    }

    return insertTypename(formattedData, __typename);
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

    const adaptedData = formatResponse(
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

    const adaptedData = formatResponse(
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

    const adaptedData = formatResponse(
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

    const adaptedData = formatResponse(
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

    const adaptedData = formatResponse(
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

    const adaptedData = formatResponse(
        isStrapi,
        'contentTypes',
        data,
        'ContentType'
    ) as MetaInfoResponse[];

    return adaptedData;
};

export const parityTesting = async () => {
    const comparator = (
        a: { [key: string]: any },
        b: { [key: string]: any }
    ): number => {
        return a.name.localeCompare(b.name);
    };

    const isEqualFunc = (
        a: { [key: string]: any },
        b: { [key: string]: any }
    ): boolean => {
        const staticFieldsMatch: boolean =
            a.name === b.name &&
            a.description === b.description &&
            a.slug === b.slug &&
            a.primary_cta === b.primary_cta &&
            a.secondary_cta === b.secondary_cta &&
            a.__typename === b.__typename;

        let matched = staticFieldsMatch;

        if ('l1_product' in a) {
            matched =
                Object.is(a.l1_product.l_1_product, b.l1_product.l_1_product) &&
                staticFieldsMatch;
        }

        if (!matched) {
            console.warn('strapi', a);
            console.warn('cs', b);
        }

        return matched;
    };

    return (
        areTheSame(
            await getAllL1ProductsMetaInfo(STRAPI_CLIENT),
            await getAllL1ProductsMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        ) &&
        areTheSame(
            await getAllL2ProductsMetaInfo(STRAPI_CLIENT),
            await getAllL2ProductsMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        ) &&
        areTheSame(
            await getAllProgrammingLanguagesMetaInfo(STRAPI_CLIENT),
            await getAllProgrammingLanguagesMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        ) &&
        areTheSame(
            await getAllTechnologiesMetaInfo(STRAPI_CLIENT),
            await getAllTechnologiesMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        ) &&
        areTheSame(
            await getAllExpertiseLevelsMetaInfo(STRAPI_CLIENT),
            await getAllExpertiseLevelsMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        ) &&
        areTheSame(
            await getAllContentTypesMetaInfo(STRAPI_CLIENT),
            await getAllContentTypesMetaInfo(CS_CLIENT),
            comparator,
            isEqualFunc
        )
    );
};
