import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Podcast } from '../interfaces/podcast';
import { isStrapiClient } from '../utils/client-factory';
import { extractFieldsFromNode, getSEO, insertTypename } from './utils';

const podcastFields = `
    description
    publishDate: originalPublishDate
    title
    slug
    podcastFileUrl
    thumbnailUrl
    casted_slug
    l1Product: l_1_product {
        name
        calculatedSlug: calculated_slug
    }
    l2Product: l_2_product {
        name
        calculatedSlug: calculated_slug
    }
    programmingLanguage: programming_language {
        name
        calculatedSlug: calculated_slug
    }
    technology: technology {
        name
        calculatedSlug: calculated_slug
    }
    otherTags: other_tags {
        spokenLanguage: spoken_language {
            name
            calculatedSlug: calculated_slug
        }
        expertiseLevel: expertise_level {
            name: level
            calculatedSlug: calculated_slug
        }
        authorType: author_type {
            name
            calculatedSlug: calculated_slug
        }
    }
    seo: SEO {
        canonical_url
        meta_description
        og_description
        og_image {
            url
        }
        og_title
        og_type
        og_url
        twitter_card
        twitter_creator
        twitter_description
        twitter_image {
            url
        }
        twitter_site
        twitter_title
    }
`;

const cs_query_all = gql`
    query Podcasts {
        podcasts: all_podcasts {
            items {
                description
                publishDate: original_publish_date
                title
                slug
                podcastFileUrl: podcast_file_url
                thumbnailUrl: thumbnail_url
                casted_slug
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
                                title
                                calculated_slug
                            }
                        }
                    }
                }
                otherTags: other_tags {
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
        }
    }
`;

const cs_query_by_slug = gql`
    query Podcasts($slug: String!) {
        podcasts: all_podcasts(where: { slug: $slug }) {
            items {
                description
                publishDate: original_publish_date
                title
                slug
                podcastFileUrl: podcast_file_url
                thumbnailUrl: thumbnail_url
                casted_slug
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
                                title
                                calculated_slug
                            }
                        }
                    }
                }
                otherTags: other_tags {
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
        }
    }
`;

/**
 * Ensure CS response is compatible with original Strapi format
 */
const formatResponse = (
    isStrapiClient: boolean,
    data: any,
    allMode: boolean
) => {
    if (isStrapiClient && allMode) {
        return data.podcasts;
    }

    if (isStrapiClient && !allMode) {
        return data.podcasts.length > 0 ? data.podcasts[0] : null;
    }

    if (data.podcasts.items.length === 0) {
        return [];
    }

    let podcasts = data.podcasts.items;

    podcasts = podcasts.map((podcast: { [key: string]: any }) => ({
        ...podcast,
        l1Product: extractFieldsFromNode(podcast.l1Product, [
            'name',
            'calculatedSlug',
        ]),
        l2Product: extractFieldsFromNode(podcast.l2Product, [
            'name',
            'calculatedSlug',
        ]),
        programmingLanguage: extractFieldsFromNode(
            podcast.programmingLanguage,
            ['name', 'calculatedSlug']
        ),
        technology: extractFieldsFromNode(podcast.technology, [
            'name',
            'calculatedSlug',
        ]),
        seo: getSEO(podcast.seo),
    }));

    return insertTypename(podcasts, 'Podcast');
};

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllPodcastsFromAPI = async (
    client: UnderlyingClient<'ApolloREST'> | UnderlyingClient<'ApolloGraphQL'>
): Promise<Podcast[]> => {
    const strapi_query = gql`
        query Podcasts {
            podcasts @rest(type: "Podcast", path: "/podcasts?_limit=-1") {
                ${podcastFields}
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query_all;

    const { data }: ApolloQueryResult<{ podcasts: Podcast[] }> =
        await client.query({ query });

    return formatResponse(isStrapi, data, true);
};

export const getPodcastBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'> | UnderlyingClient<'ApolloGraphQL'>,
    slug: string
): Promise<Podcast | null> => {
    const strapi_query = gql`
        query Podcasts {
            podcasts @rest(type: "Podcast", path: "/podcasts?slug_eq=${slug}") {
                ${podcastFields}
            }
        }
    `;

    const isStrapi = isStrapiClient(client);
    const query = isStrapi ? strapi_query : cs_query_by_slug;
    const variables = isStrapi ? null : { slug };

    const { data }: ApolloQueryResult<{ podcasts: Podcast[] }> =
        await client.query({
            query,
            variables,
        });

    return formatResponse(isStrapi, data, false);
};

export default getAllPodcastsFromAPI;
