import { CS_PodcastResponse } from '../interfaces/podcast';
import { allPodcastsQuery, podcastsBySlugQuery } from '../graphql/podcasts';
import { fetchAll } from './contentstack_utils';

export const getAllPodcastsFromAPI = async (): Promise<
    CS_PodcastResponse[]
> => {
    const podcasts = (await fetchAll(
        allPodcastsQuery,
        'podcasts'
    )) as CS_PodcastResponse[];

    return podcasts;
};

export const getPodcastBySlugFromAPI = async (
    slug: string
): Promise<CS_PodcastResponse | null> => {
    const variables = { slug };
    const podcasts = (await fetchAll(
        podcastsBySlugQuery,
        'podcasts',
        variables
    )) as CS_PodcastResponse[];

    if (!podcasts) {
        return null;
    }

    return podcasts[0];
};
