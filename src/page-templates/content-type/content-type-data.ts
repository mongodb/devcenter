import * as Sentry from '@sentry/nextjs';
import { PillCategory, pillCategoryToSlug } from '../../types/pill-category';
import { getFilters } from '../../hooks/search/utils';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getSearchContent } from '../../api-requests/get-all-search-content';
import allContent from '../../service/get-all-content.preval';
import allSearchContent from '../../service/get-all-search-content.preval';
import { getFeaturedForContent } from '../../service/get-featured-for-content';
import { getFeaturedLangProdTech } from './utils';
import { SearchQueryResponse, SortByType } from '../../components/search/types';
import {
    buildSearchQuery,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';

export const getContentTypePageData = async (
    contentType: PillCategory,
    pageNumber?: number
) => {
    const slug = pillCategoryToSlug.get(contentType);
    if (!slug) {
        throw Error(`Could not find slug for ${contentType}`);
    }

    const searchContentQueryParams = {
        searchString: '',
        contentType: contentType,
        sortBy: 'Most Recent' as SortByType,
        pageNumber: pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
    };
    const initialSearchContentKey = buildSearchQuery(searchContentQueryParams);
    let initialSearchContent: SearchQueryResponse | null = null;
    try {
        initialSearchContent = await getSearchContent(searchContentQueryParams);
    } catch (e) {
        Sentry.captureException(e);
    }

    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(
        contentType,
        allSearchContent
    );
    const metaInfoForTopic = await getMetaInfoForTopic(slug);
    const description = metaInfoForTopic?.description
        ? metaInfoForTopic.description
        : '';

    const content = allContent.filter(item => item.category === contentType);
    const featured = await getFeaturedForContent(content, slug, true);

    const extra =
        contentType === 'Tutorial'
            ? getFeaturedLangProdTech(contentType, content)
            : {};

    return {
        contentType,
        swrFallback: {
            [initialSearchContentKey]: initialSearchContent,
        },
        ...filters,
        featured,
        description,
        ...extra,
        initialSearchContent,
        pageNumber,
        slug,
    };
};
