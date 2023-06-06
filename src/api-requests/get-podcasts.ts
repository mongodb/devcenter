import { CS_PodcastResponse } from '../interfaces/podcast';
import axios from 'axios';
import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

// const getAllPodcastsFromAPI = async (
//     client: UnderlyingClient<'ApolloGraphQL'>
// ): Promise<CS_PodcastResponse[]> => {
//     const podcasts = (await fetchAll(
//         client,
//         allPodcastsQuery,
//         'podcasts'
//     )) as CS_PodcastResponse[];
//
//     return podcasts;
// };

// export const getPodcastBySlugFromAPI = async (
//     client: UnderlyingClient<'ApolloGraphQL'>,
//     slug: string
// ): Promise<CS_PodcastResponse | null> => {
//     const variables = { slug };
//     const podcasts = (await fetchAll(
//         client,
//         podcastsBySlugQuery,
//         'podcasts',
//         variables
//     )) as CS_PodcastResponse[];
//
//     if (!podcasts) {
//         return null;
//     }
//
//     return podcasts[0];
// };

const CS_podcastFields = `
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
`;

export const getAllPodcastsQuery = (skip: number) => `
    query get_all_podcasts{
        all_podcasts(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip}) {
            total
            items {
                ${CS_podcastFields}
            }
        }
    }
`;

export const getPodcastsBySlugQuery = (calculatedSlug: string) => `
    query get_podcast {
        all_podcasts(where: { slug: "${calculatedSlug}" }) {
            items {
                ${CS_podcastFields}
            }
        }
    }
`;

export const getAllPodcastsFromAPI = async (): Promise<
    CS_PodcastResponse[]
> => {
    let url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllPodcastsQuery(0)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_podcasts;
    while (items.length < total) {
        url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllPodcastsQuery(items.length)}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_podcasts.items);
    }
    return items;
};

export const getPodcastBySlugFromAPI = async (
    slug: string
): Promise<CS_PodcastResponse | null> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getPodcastsBySlugQuery(slug)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_podcasts;
    return items[0];
};
