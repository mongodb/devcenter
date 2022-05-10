import { STRAPI_CLIENT } from '../config/api-client';
import { Video } from '../interfaces/video';
import getAllVideosFromAPI from '../api-requests/get-all-videos';

export const getAllVideos = async (): Promise<Video[]> => {
    const videos = await getAllVideosFromAPI(STRAPI_CLIENT);
    return videos;
};
