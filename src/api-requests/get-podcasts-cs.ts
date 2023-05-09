import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { PillCategory } from '../types/pill-category';
import { Podcast } from '../interfaces/podcast';
import { GenericTagTypeResponse } from '../interfaces/tag-type-response';
import {
    fetchAll,
    extractFieldsFromNode,
    extractFieldsFromNodes,
    getSEO,
} from './utils';
import { CSEdges, CSPodcast } from '../interfaces/contentstack';
import { OtherTags } from '../interfaces/other-tags';

const cs_query_all = gql`
    query Podcasts($skip: Int = 0) {
        podcasts: all_podcasts(skip: $skip) {
            total
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
                                name: title
                                calculatedSlug: calculated_slug
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

const getOtherTags = (otherTagsData: any) => {
    if (!otherTagsData) {
        return null;
    }

    const otherTags = {
        spokenLanguage: extractFieldsFromNode(otherTagsData.spokenLanguage, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        expertiseLevel: extractFieldsFromNode(otherTagsData.expertiseLevel, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        authorType: extractFieldsFromNode(otherTagsData.authorType, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        contentType: {
            contentType: 'Podcast' as PillCategory,
            calculatedSlug: '',
        },
    };

    if (
        otherTags.spokenLanguage ||
        otherTags.expertiseLevel ||
        otherTags.authorType
    ) {
        return otherTags;
    }

    return null;
};

const formatResponses = (csPodcasts: CSPodcast[]): Podcast[] => {
    return csPodcasts.map(p => ({
        // explicitly defined instead of using spread operator
        // because fields can be undefined and mess up JSON serialization
        description: p.description ? p.description : '',
        publishDate: p.publishDate ? p.publishDate : '',
        title: p.title ? p.title : '',
        slug: p.slug ? p.slug : '',
        l1Product: extractFieldsFromNode(p.l1Product as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        l2Product: extractFieldsFromNode(p.l2Product as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse,
        programmingLanguage: extractFieldsFromNodes(
            p.programmingLanguage as CSEdges<any>,
            ['name', 'calculatedSlug']
        ) as GenericTagTypeResponse[],
        technology: extractFieldsFromNodes(p.technology as CSEdges<any>, [
            'name',
            'calculatedSlug',
        ]) as GenericTagTypeResponse[],
        otherTags: getOtherTags(p.otherTags) as OtherTags,
        seo: getSEO(p.seo),
        podcastFileUrl: p.podcastFileUrl ? p.podcastFileUrl : '',
        thumbnailUrl: p.thumbnailUrl ? p.thumbnailUrl : '',
        casted_slug: p.casted_slug ? p.casted_slug : '',
    }));
};

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllPodcastsFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<Podcast[]> => {
    const query = cs_query_all;
    const podcasts = (await fetchAll(client, query, 'podcasts')) as CSPodcast[];
    console.log(JSON.stringify(podcasts, null, 2));
    const data = formatResponses(podcasts);
    console.log(JSON.stringify(data, null, 2));

    return data;
};

export const getPodcastBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    slug: string
): Promise<Podcast | null> => {
    const query = cs_query_by_slug;
    const variables = { slug };
    const { data }: ApolloQueryResult<{ podcasts: Podcast[] }> =
        await client.query({
            query,
            variables,
        });

    return data.podcasts.length > 0 ? data.podcasts[0] : null;
};

export default getAllPodcastsFromAPI;
