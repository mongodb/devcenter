import { UnderlyingClient } from '../types/client-factory';
import { Podcast } from '../interfaces/podcast';
import { GenericTagTypeResponse } from '../interfaces/tag-type-response';
import { CSEdges, CSPodcast } from '../interfaces/contentstack';
import { OtherTags } from '../interfaces/other-tags';

import {
    fetchAll,
    extractFieldsFromNode,
    extractFieldsFromNodes,
    getSEO,
    getOtherTags,
} from './utils';
import { allPodcastsQuery, podcastsBySlugQuery } from '../graphql/podcasts';

const formatResponses = (csPodcasts: CSPodcast[]): Podcast[] => {
    return csPodcasts.map(p => ({
        // explicitly defined instead of using spread operator
        // to ensure default value for undefined
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
        // thumbnailUrl follow old format to return null value
        // but cast as string to conform to the interface
        thumbnailUrl: (p.thumbnailUrl ? p.thumbnailUrl : null) as string,
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
    const podcasts = (await fetchAll(
        client,
        allPodcastsQuery,
        'podcasts'
    )) as CSPodcast[];
    const data = formatResponses(podcasts);

    return data;
};

export const getPodcastBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    slug: string
): Promise<Podcast | null> => {
    const variables = { slug };
    const podcasts = (await fetchAll(
        client,
        podcastsBySlugQuery,
        'podcasts',
        variables
    )) as CSPodcast[];

    if (!podcasts) {
        return null;
    }

    const data = formatResponses(podcasts)[0];
    return data;
};

export default getAllPodcastsFromAPI;
