import { getAllVideosQuery, getVideoQuery } from '../graphql/videos';
import { CS_VideoResponse } from '../interfaces/video';
import { fetchAll, getClient } from './contentstack_utils';

export const getAllVideosFromAPI = async (): Promise<CS_VideoResponse[]> => {
    const client = getClient('production');
    const videos = (await fetchAll(
        getAllVideosQuery,
        'videos',
        client
    )) as CS_VideoResponse[];

    return videos;
};

export const getVideoBySlugFromAPI = async (
    slug: string
): Promise<CS_VideoResponse | null> => {
    const client = getClient('production');
    const variables = { slug };
    const videos = (await fetchAll(
        getVideoQuery,
        'videos',
        client,
        variables
    )) as CS_VideoResponse[];

    if (!videos) {
        return null;
    }

    return videos[0];
};
