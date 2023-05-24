import { fetchAll } from './contentstack_utils';
import { UnderlyingClient } from '../types/client-factory';
import { CS_VideoResponse } from '../interfaces/video';
import { allVideosQuery, videoBySlugQuery } from '../graphql/videos';

const getAllVideosFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>
): Promise<CS_VideoResponse[]> => {
    const videos = (await fetchAll(
        client,
        allVideosQuery,
        'videos'
    )) as CS_VideoResponse[];

    return videos;
};

export const getVideoBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    slug: string
): Promise<CS_VideoResponse | null> => {
    const variables = { slug };
    const videos = (await fetchAll(
        client,
        videoBySlugQuery,
        'videos',
        variables
    )) as CS_VideoResponse[];

    if (!videos) {
        return null;
    }

    return videos[0];
};

export default getAllVideosFromAPI;
