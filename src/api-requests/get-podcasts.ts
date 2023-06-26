import { CS_PodcastResponse } from '../interfaces/podcast';
import { getAllPodcastsQuery, getPodcastQuery } from '../graphql/podcasts';
import { fetchAll, getClient } from './contentstack_utils';

export const getAllPodcastsFromAPI = async (): Promise<
    CS_PodcastResponse[]
> => {
    const client = getClient('production');
    const podcasts = (await fetchAll(
        getAllPodcastsQuery,
        'podcasts',
        client
    )) as CS_PodcastResponse[];

    return podcasts;
};

export const getPodcastBySlugFromAPI = async (
    slug: string
): Promise<CS_PodcastResponse | null> => {
    const client = getClient('production');
    const variables = { slug };
    const podcasts = (await fetchAll(
        getPodcastQuery,
        'podcasts',
        client,
        variables
    )) as CS_PodcastResponse[];

    if (!podcasts) {
        return null;
    }

    return podcasts[0];
};
