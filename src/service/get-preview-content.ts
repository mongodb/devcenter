import { ContentItem } from '../interfaces/content-item';
import { getAllDraftArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';
import {
    mapArticlesToContentItems,
    mapIndustryEventToContentItem,
} from './build-content-items';
import { getDraftEventFromAPI } from '../api-requests/get-industry-events';

export const getPreviewContentForArticles: (
    calculatedSlug: string
) => Promise<ContentItem[]> = async calculatedSlug => {
    const allArticles = await getAllDraftArticlesFromAPI(
        STRAPI_CLIENT,
        calculatedSlug
    );

    return mapArticlesToContentItems(allArticles, []);
};

export const getPreviewContentForEvents: (
    calculatedSlug: string
) => Promise<ContentItem | null> = async calculatedSlug => {
    const event = await getDraftEventFromAPI(STRAPI_CLIENT, calculatedSlug);
    return event ? mapIndustryEventToContentItem(event) : null;
};
