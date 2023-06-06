import { CS_VideoResponse } from '../interfaces/video';
import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';
import axios from 'axios';

// const getAllVideosFromAPI = async (
//     client: UnderlyingClient<'ApolloGraphQL'>
// ): Promise<CS_VideoResponse[]> => {
//     const videos = (await fetchAll(
//         client,
//         allVideosQuery,
//         'videos'
//     )) as CS_VideoResponse[];
//
//     return videos;
// };
//
// export const getVideoBySlugFromAPI = async (
//     client: UnderlyingClient<'ApolloGraphQL'>,
//     slug: string
// ): Promise<CS_VideoResponse | null> => {
//     const variables = { slug };
//     const videos = (await fetchAll(
//         client,
//         videoBySlugQuery,
//         'videos',
//         variables
//     )) as CS_VideoResponse[];
//
//     if (!videos) {
//         return null;
//     }
//
//     return videos[0];
// };

const CS_VideoFields = `
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
`;

export const getAllVideosQuery = (skip: number) => `
    query get_all_videos{
        all_videos(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip}) {
            total
            items {
                ${CS_VideoFields}
            }
        }
    }
`;

export const getVideosBySlugQuery = (calculatedSlug: string) => `
    query get_video {
        all_videos(where: { slug: "${calculatedSlug}" }) {
            items {
                ${CS_VideoFields}
            }
        }
    }
`;

export const getAllVideosFromAPI = async (): Promise<CS_VideoResponse[]> => {
    let url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllVideosQuery(0)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_videos;
    while (items.length < total) {
        url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllVideosQuery(items.length)}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_videos.items);
    }
    return items;
};

export const getVideoBySlugFromAPI = async (
    slug: string
): Promise<CS_VideoResponse | null> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getVideosBySlugQuery(slug)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_videos;
    return items[0];
};

export default getAllVideosFromAPI;
