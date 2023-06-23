import { allVideosQuery, videoBySlugQuery } from '../graphql/videos';
import { CS_VideoResponse } from '../interfaces/video';
import { fetchAll } from './contentstack_utils';

export const getAllVideosFromAPI = async (): Promise<CS_VideoResponse[]> => {
    const videos = (await fetchAll(
        allVideosQuery,
        'videos'
    )) as CS_VideoResponse[];

    return videos;
};

export const getVideoBySlugFromAPI = async (
    slug: string
): Promise<CS_VideoResponse | null> => {
    const variables = { slug };
    const videos = (await fetchAll(
        videoBySlugQuery,
        'videos',
        variables
    )) as CS_VideoResponse[];

    if (!videos) {
        return null;
    }

    return videos[0];
};
