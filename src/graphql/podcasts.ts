import { gql } from '@apollo/client';

const podcastFields = gql`
    fragment PodcastFields on Podcasts {
        title
        description
        slug
        podcast_file_url
        thumbnail_url
        original_publish_date
        media_type
        other_tags {
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
        }
        seo {
            canonical_url
            meta_description
            og_url
            og_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
            og_type
            og_description
            twitter_creator
            twitter_description
            twitter_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
            twitter_card
        }
        casted_slug
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
        technologiesConnection {
            edges {
                node {
                    ... on Technologies {
                        title
                        calculated_slug
                    }
                }
            }
        }
        programming_languagesConnection {
            edges {
                node {
                    ... on ProgrammingLanguages {
                        title
                        calculated_slug
                    }
                }
            }
        }
    }
`;

export const allPodcastsQuery = gql`
    query Podcasts($skip: Int = 0) {
        podcasts: all_podcasts(skip: $skip) {
            total
            items {
                ...PodcastFields
            }
        }
    }
    ${podcastFields}
`;

export const podcastsBySlugQuery = gql`
    query Podcasts($slug: String!, $skip: Int = 0) {
        podcasts: all_podcasts(where: { slug: $slug }, skip: $skip) {
            total
            items {
                ...PodcastFields
            }
        }
    }
    ${podcastFields}
`;
