import * as Sentry from '@sentry/nextjs';
import { Tag } from '../../interfaces/tag';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { defaultSortByType, SearchItem } from '../../components/search/types';
import { ContentTypeTag } from '../../interfaces/tag-type-response';
import { getSearchContent } from '../../api-requests/get-all-search-content';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import allMetaInfoPreval from '../../service/get-all-meta-info.preval';
import allContentPreval from '../../service/get-all-content.preval';
import allContentTypes from '../../service/get-all-content-types.preval';
import { getSideNav } from '../../service/get-side-nav';
import { PillCategory, pillCategoryToSlug } from '../../types/pill-category';
import { appendDocumentationLinkToSideNav } from '../../utils/page-template-helpers';
import { TagType } from '../../types/tag-type';

export const getTopicContentTypePageData = async (
    l1_l2: string,
    topic: string,
    slug: string[],
    pageNumber: number
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

    const contentType: PillCategory = allContentTypes
        .filter((contentTypeTag: ContentTypeTag) => {
            return (
                contentTypeSlug.toLowerCase() ===
                contentTypeTag.calculatedSlug.toLowerCase()
            );
        })
        .map((contentTypeTag: ContentTypeTag) => contentTypeTag.contentType)[0];

    let initialSearchContent: SearchItem[] | null = null;
    try {
        initialSearchContent = await getSearchContent({
            searchString: '',
            tagSlug: topicSlug,
            contentType: contentType,
            sortBy: defaultSortByType,
        });
    } catch (e) {
        Sentry.captureException(e);
    }

    let tertiaryNavItems = await getSideNav(topicSlug, allContentPreval);

    const metaInfoForTopic = await getMetaInfoForTopic(
        topicSlug,
        allMetaInfoPreval
    );

    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );

    const contentTypeAggregateSlug = pillCategoryToSlug.get(contentType);

    const subTopics = metaInfoForTopic?.topics;
    let subTopicsWithContentType: Tag[] = [];
    // This is super annoying, but we need to only show the subtopics that have the content type we are looking at.
    if (subTopics) {
        const allRelevantContent = allContentPreval.filter(
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
        subTopicsWithContentType = subTopics
            .filter(subTopic =>
                allRelevantContent.find(item =>
                    item.tags.find(
                        tag =>
                            tag.type === 'L2Product' &&
                            tag.name === subTopic.tagName
                    )
                )
            )
            .map(item => ({
                name: item.tagName,
                slug: item.slug,
                type: item.category,
            }));
    }

    const topicTag: Tag = {
        name: metaInfoForTopic?.tagName ?? '',
        type: metaInfoForTopic?.category ?? ('' as TagType),
        slug: topicSlug,
    };

    const data = {
        crumbs,
        contentType,
        tertiaryNavItems: tertiaryNavItems,
        topic: topicTag,
        contentTypeSlug: contentTypeSlug || null,
        contentTypeAggregateSlug: contentTypeAggregateSlug || null,
        description: metaInfoForTopic?.description ?? '',
        subTopics: subTopicsWithContentType,
        initialSearchContent,
        pageNumber,
    };

    return data;
};
