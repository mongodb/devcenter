import { STRAPI_CLIENT } from '../config/api-client';
import { Video } from '../interfaces/video';
import getAllVideosFromAPI from '../api-requests/get-all-videos';

export const getAllVideos = async (): Promise<Video[]> => {
    const videos = await getAllVideosFromAPI(STRAPI_CLIENT);

    videos.forEach(v => {
        if (v.otherTags) {
            v.otherTags.contentType = {
                contentType: 'Video',
                calculatedSlug: '/videos',
            };
        } else {
            v.otherTags = {
                contentType: {
                    contentType: 'Video',
                    calculatedSlug: '/videos',
                },
            };
        }
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

    return videos;
};
