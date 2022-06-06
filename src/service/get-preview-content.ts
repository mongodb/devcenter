import { ContentItem } from '../interfaces/content-item';
import { getAllDraftArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';
import { mapArticlesToContentItems } from './get-all-content';

export const getPreviewContent: () => Promise<ContentItem[]> = async () => {
    const allArticles = await getAllDraftArticlesFromAPI(STRAPI_CLIENT);

    return mapArticlesToContentItems(allArticles, [], []);
};
