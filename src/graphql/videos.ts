import { gql } from '@apollo/client';

const videoFields = gql`
    fragment VideoFields on Videos {
        title
        description
        original_publish_date
        slug
        thumbnail_url
        video_id
        media_type
        other_tags {
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
                        description
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
                        description
                    }
                }
            }
            twitter_card
        }
        relevant_links
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
    }
`;

export const getAllVideosQuery = gql`
    query get_all_videos($skip: Int = 0) {
        videos: all_videos(skip: $skip) {
            total
            items {
                ...VideoFields
            }
        }
    }
    ${videoFields}
`;

export const getVideoQuery = gql`
    query get_video($slug: String!, $skip: Int = 0) {
        videos: all_videos(where: { slug: $slug }, skip: $skip) {
            total
            items {
                ...VideoFields
            }
        }
    }
    ${videoFields}
`;
