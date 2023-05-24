import { CS_CLIENT } from '../config/api-client';
import { CS_PodcastResponse } from '../interfaces/podcast';
import getAllPodcastsFromAPI, {
    getPodcastBySlugFromAPI,
} from '../api-requests/get-podcasts';
import { ContentTypeTag } from '../interfaces/tag-type-response';

const setPodcastTags = (podcasts: CS_PodcastResponse[]) => {
    const contentType: ContentTypeTag = {
        contentType: 'Podcast',
        calculatedSlug: '/podcasts',
    };
    const modifiedPodcasts = podcasts.map((item: CS_PodcastResponse) => ({
        ...item,
        other_tags: {
            ...item.other_tags,
            contentType: contentType,
        },
    }));
    modifiedPodcasts.forEach((p: CS_PodcastResponse) => {
        if (p.l1_productConnection) {
            p.other_tags.l1_productConnection = p.l1_productConnection;
        }
        if (p.l2_productConnection) {
            p.other_tags.l2_productConnection = p.l2_productConnection;
        }
        if (p.programming_languagesConnection) {
            p.other_tags.programming_languagesConnection =
                p.programming_languagesConnection;
        }
        if (p.technologiesConnection) {
            p.other_tags.technologiesConnection = p.technologiesConnection;
        }
    });

    return modifiedPodcasts;
};

export const getAllPodcasts = async (): Promise<CS_PodcastResponse[]> => {
    const podcasts = await getAllPodcastsFromAPI(CS_CLIENT);
    return setPodcastTags(podcasts);
};

export const getPodcastBySlug = async (
    slug: string
): Promise<CS_PodcastResponse | null> => {
    const podcast = await getPodcastBySlugFromAPI(CS_CLIENT, slug);
    if (!podcast) return null;
    const modifiedPodcasts = setPodcastTags([podcast]);
    return modifiedPodcasts.length > 0 ? modifiedPodcasts[0] : null;
};
