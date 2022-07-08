import { PillCategory, pillCategoryToSlug } from '../../types/pill-category';
import { getFilters } from '../../hooks/search/utils';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getAllContentItems } from '../../service/get-all-content';
import { getFeaturedForContent } from '../../service/get-featured-for-content';
import { getFeaturedLangProdTech } from './utils';

export const getContentTypePageData = async (contentType: PillCategory) => {
    const slug = pillCategoryToSlug.get(contentType);
    if (!slug) {
        throw Error(`Could not find slug for ${contentType}`);
    }
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(contentType);
    const metaInfoForTopic = await getMetaInfoForTopic(slug);
    const description = metaInfoForTopic?.description
        ? metaInfoForTopic.description
        : '';

    const content = (await getAllContentItems()).filter(
        item => item.category === contentType
    );
    const featured = await getFeaturedForContent(content, slug);

    const extra =
        contentType === 'Tutorial'
            ? getFeaturedLangProdTech(contentType, content)
            : {};

    return { contentType, ...filters, featured, description, ...extra };
};
