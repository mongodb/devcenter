import { gql } from '@apollo/client';

const featuredContentFields = gql`
    fragment FeaturedContentFields on FeaturedContent {
        categoryConnection {
            edges {
                node {
                    ... on L1Products {
                        calculated_slug
                    }
                    ... on ContentTypes {
                        calculated_slug
                    }
                    ... on ProgrammingLanguages {
                        calculated_slug
                    }
                    ... on Technologies {
                        calculated_slug
                    }
                }
            }
        }
        industry_eventsConnection(limit: 3) {
            edges {
                node {
                    ... on IndustryEvents {
                        title
                    }
                }
            }
        }
        podcastsConnection(limit: 3) {
            edges {
                node {
                    ... on Podcasts {
                        title
                    }
                }
            }
        }
        videosConnection(limit: 3) {
            edges {
                node {
                    ... on Videos {
                        title
                    }
                }
            }
        }
        articlesConnection(limit: 3) {
            edges {
                node {
                    ... on Articles {
                        title
                    }
                }
            }
        }
    }
`;

export const getAllFeaturedContentQuery = gql`
    query get_all_featured_content($skip: Int = 0) {
        featuredContent: all_featured_content(skip: $skip) {
            total
            items {
                ...FeaturedContentFields
            }
        }
    }
    ${featuredContentFields}
`;

export const getFeaturedForTopicQuery = gql`
    query get_all_featured_content($skip: Int = 0, $topicSlug: String!) {
        featuredContent: all_featured_content(
            skip: $skip
            where: {
                category: {
                    MATCH: ANY
                    content_types: { calculated_slug: $topicSlug }
                    l1_products: { calculated_slug: $topicSlug }
                    programming_languages: { calculated_slug: $topicSlug }
                    technologies: { calculated_slug: $topicSlug }
                }
            }
        ) {
            total
            items {
                ...FeaturedContentFields
            }
        }
    }
    ${featuredContentFields}
`;
