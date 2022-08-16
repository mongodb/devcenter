import { PillCategory, pillCategoryToSlug } from '../../types/pill-category';
import { getFilters } from '../../hooks/search/utils';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getSearchContent } from '../../api-requests/get-all-search-content';
import allContent from '../../service/get-all-content.preval';
import allSearchContent from '../../service/get-all-search-content.preval';
import { getFeaturedForContent } from '../../service/get-featured-for-content';
import { getFeaturedLangProdTech } from './utils';
import { SearchItem } from '../../components/search/types';

export const getContentTypePageData = async (
    contentType: PillCategory,
    pageNumber?: number
) => {
    const slug = pillCategoryToSlug.get(contentType);
    if (!slug) {
        throw Error(`Could not find slug for ${contentType}`);
    }

    const initialSearchContent: SearchItem[] = await getSearchContent({
        searchString: '',
        contentType: contentType,
        sortBy: 'Most Recent',
    });

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
        ...filters,
        featured,
        description,
        ...extra,
        initialSearchContent,
        pageNumber,
        slug,
    };
};
