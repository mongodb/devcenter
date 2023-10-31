import { gql } from '@apollo/client';
import { CS_GRAPHQL_LIMIT } from '../data/constants';

export const getAllPublishingMetadataQuery = gql`
    query get_all_publish_metadata($skip: Int = 0) {
        publish_metadata: all_publish_metadata(
            limit: ${CS_GRAPHQL_LIMIT},
            skip: $skip
        ) {
            total
            items {
                system {
                    publish_details {
                        time
                    }
                }
                articleConnection {
                    edges {
                        node {
                        ... on Articles {
                                calculated_slug
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const getPublishingMetadataQuery = gql`
    query get_all_publish_metadata($skip: Int = 0, $calculatedSlug: String!) {
        publish_metadata: all_publish_metadata(
            skip: $skip
            where: {
                article: { articles: { calculated_slug: $calculatedSlug } }
            }
        ) {
            total
            items {
                system {
                    publish_details {
                        time
                    }
                }
            }
        }
    }
`;
