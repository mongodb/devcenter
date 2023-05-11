import { gql } from '@apollo/client';

const videoFields = gql`
    fragment VideoFields on Videos {
        description
        publishDate: original_publish_date
        title
        slug
        videoId: video_id
        relevantLinks: relevant_links
        thumbnail_url
        l1Product: l1_productConnection {
            edges {
                node {
                    ... on L1Products {
                        name: title
                        calculatedSlug: calculated_slug
                    }
                }
            }
        }
        l2Product: l2_productConnection {
            edges {
                node {
                    ... on L2Products {
                        name: title
                        calculatedSlug: calculated_slug
                    }
                }
            }
        }
        programmingLanguage: programming_languagesConnection {
            edges {
                node {
                    ... on ProgrammingLanguages {
                        name: title
                        calculatedSlug: calculated_slug
                    }
                }
            }
        }
        technology: technologiesConnection {
            edges {
                node {
                    ... on Technologies {
                        name: title
                        calculatedSlug: calculated_slug
                    }
                }
            }
        }
        other_tags {
            spokenLanguage: spoken_languageConnection {
                edges {
                    node {
                        ... on SpokenLanguages {
                            name: title
                            calculatedSlug: calculated_slug
                        }
                    }
                }
            }
            expertiseLevel: expertise_levelConnection {
                edges {
                    node {
                        ... on Levels {
                            name: title
                            calculatedSlug: calculated_slug
                        }
                    }
                }
            }
            authorType: author_typeConnection {
                edges {
                    node {
                        ... on AuthorTypes {
                            name: title
                            calculatedSlug: calculated_slug
                        }
                    }
                }
            }
        }
        seo {
            canonical_url
            meta_description
            og_description
            og_image: og_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
            twitter_card
            twitter_creator
            twitter_description
            twitter_image: twitter_imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
        }
    }
`;

export const allVideosQuery = gql`
    query Videos($skip: Int = 0) {
        videos: all_videos(skip: $skip) {
            total
            items {
                ...VideoFields
            }
        }
    }
    ${videoFields}
`;

export const videoBySlugQuery = gql`
    query Videos($slug: String!, $skip: Int = 0) {
        videos: all_videos(where: { slug: $slug }, skip: $skip) {
            total
            items {
                ...VideoFields
            }
        }
    }
    ${videoFields}
`;
