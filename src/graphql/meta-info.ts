import { gql } from '@apollo/client';
import { CS_GRAPHQL_LIMIT } from '../data/constants';
import { ContentTypeUID } from '../interfaces/meta-info';

export const getAllAuthorTypesQuery = gql`
    query get_all_author_types($skip: Int = 0) {
        author_types: all_author_types(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllContentTypesQuery = gql`
    query get_all_content_types($skip: Int = 0) {
        content_types: all_content_types(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllLevelsQuery = gql`
    query get_all_levels($skip: Int = 0) {
        levels: all_levels(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllL1ProductsQuery = gql`
    query get_all_l1_products($skip: Int = 0) {
        l1_products: all_l1_products(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllL2ProductsQuery = gql`
    query get_all_l2_products($skip: Int = 0) {
        l2_products: all_l2_products(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
                l1_productConnection {
                    edges {
                        node {
                            ... on L1Products {
                                title
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const getAllProgrammingLanguagesQuery = gql`
    query get_all_programming_languages($skip: Int = 0) {
        programming_languages: all_programming_languages(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllSpokenLanguagesQuery = gql`
    query get_all_spoken_languages($skip: Int = 0) {
        spoken_languages: all_spoken_languages(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getAllTechnologiesQuery = gql`
    query get_all_technologies($skip: Int = 0) {
        technologies: all_technologies(
            limit: ${CS_GRAPHQL_LIMIT}
            skip: $skip
        ) {
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
            }
        }
    }
`;

export const getMetaInfoQuery = (contentTypeUID: ContentTypeUID) => {
    switch (contentTypeUID) {
        case 'author_types':
            return getAllAuthorTypesQuery;
        case 'content_types':
            return getAllContentTypesQuery;
        case 'levels':
            return getAllLevelsQuery;
        case 'l1_products':
            return getAllL1ProductsQuery;
        case 'l2_products':
            return getAllL2ProductsQuery;
        case 'programming_languages':
            return getAllProgrammingLanguagesQuery;
        case 'spoken_languages':
            return getAllSpokenLanguagesQuery;
        case 'technologies':
            return getAllTechnologiesQuery;
        default:
            throw new Error(`${contentTypeUID} is not a valid contentType UID`);
    }
};
