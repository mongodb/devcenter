import { CS_CLIENT } from '../config/api-client';
import { Podcast } from '../interfaces/podcast';
import getAllPodcastsFromAPI, {
    getPodcastBySlugFromAPI,
} from '../api-requests/get-podcasts';
import { ContentTypeTag } from '../interfaces/tag-type-response';

const setPodcastTags = (podcasts: Podcast[]) => {
    const contentType: ContentTypeTag = {
        contentType: 'Podcast',
        calculatedSlug: '/podcasts',
    };
    const modifiedPodcasts = podcasts.map(item => ({
        ...item,
        otherTags: {
            ...item.otherTags,
            contentType: contentType,
        },
    }));

    modifiedPodcasts.forEach(p => {
        if (p.l1Product) {
            p.otherTags.l1Product = p.l1Product;
        }
        if (p.l2Product) {
            p.otherTags.l2Product = p.l2Product;
        }
        if (p.programmingLanguage) {
            p.otherTags.programmingLanguage = p.programmingLanguage;
        }
        if (p.technology) {
            p.otherTags.technology = p.technology;
        }
    });

    return modifiedPodcasts;
};

export const getAllPodcasts = async (): Promise<Podcast[]> => {
    const podcasts = await getAllPodcastsFromAPI(CS_CLIENT);

    return setPodcastTags(podcasts);
};

export const getPodcastBySlug = async (
    slug: string
): Promise<Podcast | null> => {
    const podcast = await getPodcastBySlugFromAPI(CS_CLIENT, slug);
    if (!podcast) return null;
    const modifiedPodcasts = setPodcastTags([podcast]);
    return modifiedPodcasts.length > 0 ? modifiedPodcasts[0] : null;
};
