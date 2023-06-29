import { ContentItem } from '../interfaces/content-item';
import { CS_getDraftArticleBySlugFromCMS } from '../api-requests/get-articles';
import {
    CS_mapArticlesToContentItems,
    CS_mapIndustryEventToContentItem,
} from './build-content-items';
import { CS_getDraftIndustryEventBySlugFromCMS } from '../api-requests/get-industry-events';

export const getPreviewContentForArticles: (
    calculatedSlug: string
) => Promise<ContentItem | null> = async calculatedSlug => {
    const content = await CS_getDraftArticleBySlugFromCMS(calculatedSlug);
    if (!content) return null;
    const mappedArticles = CS_mapArticlesToContentItems([content], []);
    return mappedArticles[0];
};

export const getPreviewContentForEvents: (
    calculatedSlug: string
) => Promise<ContentItem | null> = async calculatedSlug => {
    const content_stack_event = await CS_getDraftIndustryEventBySlugFromCMS(
        calculatedSlug
    );
    return content_stack_event
        ? CS_mapIndustryEventToContentItem(content_stack_event)
        : null;
};
