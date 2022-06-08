import { ContentItem } from '../interfaces/content-item';
import { getAllDraftArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';
import { mapArticlesToContentItems } from './get-all-content';
import { Article } from '../interfaces/article';

export const getPreviewContent: (
    calculatedSlug: string
) => Promise<ContentItem[]> = async calculatedSlug => {
    console.log(calculatedSlug);
    const allArticles = await getAllDraftArticlesFromAPI(
        STRAPI_CLIENT,
        calculatedSlug
    );

    return mapArticlesToContentItems(allArticles, [], []);
};
