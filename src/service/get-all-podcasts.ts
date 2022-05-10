import { STRAPI_CLIENT } from '../config/api-client';
import { Podcast } from '../interfaces/podcast';
import getAllPodcastsFromAPI from '../api-requests/get-all-podcasts';

export const getAllPodcasts = async (): Promise<Podcast[]> => {
    const podcasts = await getAllPodcastsFromAPI(STRAPI_CLIENT);

    podcasts.forEach(p => {
        if (p.otherTags) {
            p.otherTags.contentType = {
                contentType: 'Podcast',
                calculatedSlug: '/podcasts',
            };
        } else {
            p.otherTags = {
                contentType: {
                    contentType: 'Podcast',
                    calculatedSlug: '/podcasts',
                },
            };
        }

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

    return podcasts;
};
