import { ContentItem } from '../interfaces/content-item';
import { getAllDraftArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';
import { mapArticlesToContentItems } from './build-content-items';

export const getPreviewContent: (
    calculatedSlug: string
) => Promise<ContentItem[]> = async calculatedSlug => {
    const allArticles = await getAllDraftArticlesFromAPI(
        STRAPI_CLIENT,
        calculatedSlug
    );

    return mapArticlesToContentItems(allArticles, []);
};
