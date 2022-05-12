import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { MetaInfoResponse } from '../interfaces/meta-info';

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
