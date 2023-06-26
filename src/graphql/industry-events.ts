import { gql } from '@apollo/client';
import { CS_GRAPHQL_LIMIT } from '../data/constants';

const industryEventFields = gql`
    fragment IndustryEventFields on IndustryEvents {
        type
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
                        job_title
                    }
                }
            }
        }
        address {
            address_line_1
            address_line_2
            city
            coordinates
            country
            location
            preferred_location
            state
            zipcode
        }
        content
        title
        imageConnection {
            edges {
                node {
                    url
                    description
                }
            }
        }
        other_tags {
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
        calculated_slug
        description
        end_time
        slug
        start_time
        registration_url
        virtual_meetup_url
        virtual_meetup_url_text
        related_content {
            articlesConnection(limit: 3) {
                edges {
                    node {
                        ... on Articles {
                            title
                            original_publish_date
                            calculated_slug
                            system {
                                publish_details {
                                    time
                                }
                            }
                        }
                    }
                }
            }
            podcastsConnection(limit: 5) {
                edges {
                    node {
                        ... on Podcasts {
                            title
                            original_publish_date
                            calculated_slug: slug
                        }
                    }
                }
            }
            videosConnection(limit: 5) {
                edges {
                    node {
                        ... on Videos {
                            title
                            calculated_slug: slug
                            original_publish_date
                            system {
                                publish_details {
                                    time
                                }
                            }
                        }
                    }
                }
            }
            industry_eventsConnection(limit: 5) {
                edges {
                    node {
                        ... on IndustryEvents {
                            start_time
                            end_time
                            title
                            calculated_slug
                        }
                    }
                }
            }
        }
    }
`;

export const getAllIndustryEventsQuery = gql`
    query get_all_industry_events($skip: Int = 0, $today: String!) {
        industryEvents: all_industry_events(
            limit: ${CS_GRAPHQL_LIMIT},
            skip: $skip,
            where: { end_time_gte: $today }
        ) {
            total
            items {
                ...IndustryEventFields
            }
        }
    }
    ${industryEventFields}
`;

export const getIndustryEventQuery = gql`
    query get_industry_event($skip: Int = 0, $calculatedSlug: String!) {
        industryEvents: all_industry_events(
            skip: $skip
            where: { calculated_slug: $calculatedSlug }
        ) {
            total
            items {
                ...IndustryEventFields
            }
        }
    }
    ${industryEventFields}
`;
