import { ContentItem } from '../interfaces/content-item';
import { CS_getDraftArticleBySlugFromCMS } from '../api-requests/get-articles';
import {
    CS_mapArticlesToContentItems,
    CS_mapIndustryEventToContentItem,
} from './build-content-items';
import { CS_getIndustryEventBySlugFromCMS } from '../api-requests/get-industry-events';
import { CS_getFeaturedContentForTopic } from '../api-requests/get-featured-for-topic';

export const getPreviewContentForArticles: (
    calculatedSlug: string
) => Promise<ContentItem> = async calculatedSlug => {
    const content = await CS_getDraftArticleBySlugFromCMS(calculatedSlug);
    const mappedArticles = CS_mapArticlesToContentItems([content], []);
    return mappedArticles[0];
};

export const getPreviewContentForEvents: (
    calculatedSlug: string
) => Promise<ContentItem | null> = async calculatedSlug => {
    const content_stack_event = await CS_getIndustryEventBySlugFromCMS(
        calculatedSlug
    );
    const featured = await CS_getFeaturedContentForTopic('/technologies/aws');
    console.log(featured);
    return content_stack_event
        ? CS_mapIndustryEventToContentItem(content_stack_event)
        : null;
};
