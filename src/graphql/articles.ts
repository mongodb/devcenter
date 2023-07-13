import { gql } from '@apollo/client';
import { CS_GRAPHQL_LIMIT } from '../data/constants';

const articleFields = gql`
    fragment ArticleFields on Articles {
        calculated_slug
        content
        description
        imageConnection {
            edges {
                node {
                    url
                    description
                }
            }
        }
        slug
        title
        original_publish_date
        strapi_updated_at
        expiry_date
        authorsConnection(limit: 5) {
            edges {
                node {
                    ... on Authors {
                        title
                        imageConnection {
                            edges {
                                node {
                                    url
                                }
                            }
                        }
                        bio
                        calculated_slug
                        twitter
                    }
                }
            }
        }
        primary_tag {
            tagConnection {
                edges {
                    node {
                        ... on ProgrammingLanguages {
                            title
                            calculated_slug
                        }
                        ... on L1Products {
                            title
                            calculated_slug
                        }
                    }
                }
            }
        }
        other_tags {
            author_typeConnection {
                edges {
                    node {
                        ... on AuthorTypes {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            code_type
            content_typeConnection {
                edges {
                    node {
                        ... on ContentTypes {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            expertise_levelConnection {
                edges {
                    node {
                        ... on Levels {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            github_url
            l1_productConnection {
                edges {
                    node {
                        ... on L1Products {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            l2_productConnection {
                edges {
                    node {
                        ... on L2Products {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            livesite_url
            programming_languagesConnection(limit: 3) {
                edges {
                    node {
                        ... on ProgrammingLanguages {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            spoken_languageConnection {
                edges {
                    node {
                        ... on SpokenLanguages {
                            title
                            calculated_slug
                        }
                    }
                }
            }
            technologiesConnection(limit: 3) {
                edges {
                    node {
                        ... on Technologies {
                            title
                            calculated_slug
                        }
                    }
                }
            }
        }
        seo {
            canonical_url
            meta_description
            og_description
            og_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
            og_type
            og_url
            twitter_creator
            twitter_card
            twitter_description
            twitter_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
        }
        system {
            updated_at
            publish_details {
                time
            }
        }
    }
`;

export const getAllArticlesQuery = gql`
    query get_all_articles($skip: Int = 0) {
        articles: all_articles(
            limit: ${CS_GRAPHQL_LIMIT},
            skip: $skip
        ) {
            total
            items {
                ...ArticleFields
            }
        }
    }
    ${articleFields}
`;

export const getArticleQuery = gql`
    query get_article($skip: Int = 0, $calculatedSlug: String!) {
        articles: all_articles(
            skip: $skip
            where: { calculated_slug: $calculatedSlug }
        ) {
            total
            items {
                ...ArticleFields
            }
        }
    }
    ${articleFields}
`;
