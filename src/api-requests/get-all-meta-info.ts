import { ContentTypeUID, CS_MetaInfoResponse } from '../interfaces/meta-info';
import axios from 'axios';

import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { MetaInfoResponse } from '../interfaces/meta-info';

// STRAPI

export const getAllL1ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const { data }: ApolloQueryResult<{ l1Products: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.l1Products;
};

export const getAllL2ProductsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const { data }: ApolloQueryResult<{ l2Products: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.l2Products;
};

export const getAllProgrammingLanguagesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const {
        data,
    }: ApolloQueryResult<{ programmingLanguages: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.programmingLanguages;
};

/*

    | 'ContentType';
 */
export const getAllTechnologiesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const { data }: ApolloQueryResult<{ technologies: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.technologies;
};

export const getAllExpertiseLevelsMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const { data }: ApolloQueryResult<{ expertiseLevels: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.expertiseLevels;
};

export const getAllContentTypesMetaInfo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<MetaInfoResponse[]> => {
    const query = gql`
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
    const { data }: ApolloQueryResult<{ contentTypes: MetaInfoResponse[] }> =
        await client.query({ query });

    return data.contentTypes;
};

// CONTENTSTACK

export const getMetaInfoQuery = (
    contentTypeID: string,
    skip: number
) => `        
    query get_all_${contentTypeID} {
        all_${contentTypeID}(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip})  {
            total
            items {
                title
                description
                primary_cta
                secondary_cta
                documentation_link
                slug: calculated_slug
                system {
                    content_type_uid
                }
                ${
                    contentTypeID === 'l2_products'
                        ? `l1_productConnection {
                    edges {
                      node {
                        ... on L1Products {
                          title
                        }
                      }
                    }
                  }`
                        : ''
                }
            }
        }
    }
`;

export const CS_getMetaInfoFromCMS = async (
    contentTypeID: ContentTypeUID
): Promise<CS_MetaInfoResponse[]> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getMetaInfoQuery(contentTypeID, 0)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data[`all_${contentTypeID}`];

    while (items.length < total) {
        const url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getMetaInfoQuery(
            contentTypeID,
            items.length
        )}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data[`all_${contentTypeID}`].items);
    }

    return items;
};
