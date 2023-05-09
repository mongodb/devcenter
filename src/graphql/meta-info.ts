import { gql } from '@apollo/client';

export const allL1ProductsQuery = gql`
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

export const allL2ProductsQuery = gql`
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

export const allProgrammingLanguagesQuery = gql`
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

export const allTechnologiesQuery = gql`
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

export const allExpertiseLevelsQuery = gql`
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

export const allContentTypesQuery = gql`
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
