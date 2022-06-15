import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { ITopicCard } from '../../components/topic-card/types';
import { ContentTypeTag } from '../../interfaces/tag-type-response';
import { getAllContentItems } from '../../service/get-all-content';
import { getAllContentTypes } from '../../service/get-all-content-types';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getSideNav } from '../../service/get-side-nav';
import { PillCategory, pillCategoryToSlug } from '../../types/pill-category';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';

export const getTopicContentTypePageData = async (
    l1_l2: string,
    topic: string,
    slug: string[]
) => {
    /*
    eg:
    pathComponents = ['product','atlas','article']
    pathComponents = ['product','atlas','search','article'] etc
    */

    const pathComponents = [l1_l2, topic].concat(slug);

    const crumbs = await getBreadcrumbsFromSlug(pathComponents.join('/'));

    const contentTypeSlug = '/' + pathComponents[pathComponents.length - 1];
    const topicSlug =
        '/' + pathComponents.slice(0, pathComponents.length - 1).join('/');

    const allContentTypesInStrapi = await getAllContentTypes();

    const contentType: PillCategory = allContentTypesInStrapi
        .filter((contentTypeTag: ContentTypeTag) => {
            return (
                contentTypeSlug.toLowerCase() ===
                contentTypeTag.calculatedSlug.toLowerCase()
            );
        })
        .map((contentTypeTag: ContentTypeTag) => contentTypeTag.contentType)[0];

    let tertiaryNavItems = await getSideNav(topicSlug);

    const metaInfoForTopic = await getMetaInfoForTopic(topicSlug);

    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );

    const metaInfoForContentType = await getMetaInfoForTopic(contentTypeSlug);

    const contentTypeAggregateSlug = pillCategoryToSlug.get(contentType);

    const subTopics = metaInfoForTopic?.topics;
    let subTopicsWithContentType: ITopicCard[] = [];
    // This is super annoying, but we need to only show the subtopics that have the content type we are looking at.
    if (subTopics) {
        const allContent = await getAllContentItems();
        const allRelevantContent = allContent.filter(
            item =>
                item.tags.find(
                    tag =>
                        tag.type === 'ContentType' && tag.name === contentType
                ) &&
                item.tags.find(
                    tag =>
                        tag.type === 'L1Product' &&
                        tag.name === metaInfoForTopic?.tagName
                )
        );
        subTopicsWithContentType = subTopics.filter(subTopic =>
            allRelevantContent.find(item =>
                item.tags.find(
                    tag =>
                        tag.type === 'L2Product' && tag.name === subTopic.title
                )
            )
        );
    }

    const data = {
        crumbs,
        contentType: contentType,
        tertiaryNavItems: tertiaryNavItems,
        topicName: metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '',
        topicSlug: topicSlug,
        contentTypeSlug: contentTypeSlug ? contentTypeSlug : null,
        contentTypeAggregateSlug: contentTypeAggregateSlug
            ? contentTypeAggregateSlug
            : null,
        description: metaInfoForContentType?.description
            ? metaInfoForContentType.description
            : '',
        subTopics: subTopicsWithContentType,
    };

    return data;
};
