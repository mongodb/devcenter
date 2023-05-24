import { UnderlyingClient } from '../types/client-factory';
import { CS_PodcastResponse } from '../interfaces/podcast';

import { fetchAll } from './contentstack_utils';
import { allPodcastsQuery, podcastsBySlugQuery } from '../graphql/podcasts';

const getAllPodcastsFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<CS_PodcastResponse[]> => {
    const podcasts = (await fetchAll(
        client,
        allPodcastsQuery,
        'podcasts'
    )) as CS_PodcastResponse[];

    return podcasts;
};

export const getPodcastBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    slug: string
): Promise<CS_PodcastResponse | null> => {
    const variables = { slug };
    const podcasts = (await fetchAll(
        client,
        podcastsBySlugQuery,
        'podcasts',
        variables
    )) as CS_PodcastResponse[];

    if (!podcasts) {
        return null;
    }

    return podcasts[0];
};

export default getAllPodcastsFromAPI;
