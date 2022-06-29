import { STRAPI_CLIENT } from '../config/api-client';
import { Video } from '../interfaces/video';
import getAllVideosFromAPI, {
    getVideoBySlugFromAPI,
} from '../api-requests/get-videos';
import { ContentTypeTag } from '../interfaces/tag-type-response';

const setVideoTags = (videos: Video[]) => {
    const contentType: ContentTypeTag = {
        contentType: 'Video',
        calculatedSlug: '/videos',
    };
    const modifiedVideos = videos.map(item => ({
        ...item,
        otherTags: {
            ...item.otherTags,
            contentType: contentType,
        },
    }));

    modifiedVideos.forEach(v => {
        if (v.l1Product) {
            v.otherTags.l1Product = v.l1Product;
        }
        if (v.l2Product) {
            v.otherTags.l2Product = v.l2Product;
        }
        if (v.programmingLanguage) {
            v.otherTags.programmingLanguage = v.programmingLanguage;
        }
        if (v.technology) {
            v.otherTags.technology = v.technology;
        }
    });

    return modifiedVideos;
};

export const getAllVideos = async (): Promise<Video[]> => {
    const videos = await getAllVideosFromAPI(STRAPI_CLIENT);
    return setVideoTags(videos);
};

export const getVideoBySlug = async (slug: string): Promise<Video | null> => {
    const video = await getVideoBySlugFromAPI(STRAPI_CLIENT, slug);
    if (!video) return null;

    const modifiedVideos = setVideoTags([video]);
    return modifiedVideos[0];
};
