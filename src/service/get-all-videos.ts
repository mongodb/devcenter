import { CS_VideoResponse } from '../interfaces/video';
import getAllVideosFromAPI, {
    getVideoBySlugFromAPI,
} from '../api-requests/get-videos';
import { ContentTypeConnection } from '../interfaces/other-tags';

const setVideoTags = (videos: CS_VideoResponse[]) => {
    // Simulate a content type connection
    const content_typeConnection: ContentTypeConnection = {
        edges: [{ node: { title: 'Video', calculated_slug: '/videos' } }],
    };
    const modifiedVideos: CS_VideoResponse[] = videos.map(
        (item: CS_VideoResponse) => ({
            ...item,
            other_tags: {
                ...item.other_tags,
                content_typeConnection,
            },
        })
    );

    modifiedVideos.forEach((v: CS_VideoResponse) => {
        if (v.l1_productConnection) {
            v.other_tags.l1_productConnection = v.l1_productConnection;
        }
        if (v.l2_productConnection) {
            v.other_tags.l2_productConnection = v.l2_productConnection;
        }
        if (v.programming_languagesConnection) {
            v.other_tags.programming_languagesConnection =
                v.programming_languagesConnection;
        }
        if (v.technologiesConnection) {
            v.other_tags.technologiesConnection = v.technologiesConnection;
        }
    });

    return modifiedVideos;
};

export const getAllVideos = async (): Promise<CS_VideoResponse[]> => {
    const videos = await getAllVideosFromAPI();
    return setVideoTags(videos);
};

export const getVideoBySlug = async (
    slug: string
): Promise<CS_VideoResponse | null> => {
    const video = await getVideoBySlugFromAPI(slug);
    if (!video) return null;
    const modifiedVideos = setVideoTags([video]);
    return modifiedVideos[0];
};
