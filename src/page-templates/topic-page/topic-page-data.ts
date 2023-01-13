import * as Sentry from '@sentry/nextjs';
import { Tag } from '../../interfaces/tag';
import { ContentItem } from '../../interfaces/content-item';
import { defaultSortByType, SearchItem } from '../../components/search/types';
import { getSideNav } from '../../service/get-side-nav';
import { getSearchContent } from '../../api-requests/get-all-search-content';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { appendDocumentationLinkToSideNav } from '../../utils/page-template-helpers';
import { getFeaturedForContent } from '../../service/get-featured-for-content';
import { getL1L2Content } from '../../service/get-l1-l2-content';
import allContentPreval from '../../service/get-all-content.preval';
import allMetaInfoPreval from '../../service/get-all-meta-info.preval';

export const getTopicPageData = async (
    l1_l2: string,
    slug: string[],
    pageNumber: number
) => {
    const slugString = '/' + l1_l2 + '/' + slug.join('/');

    const metaInfoForTopic = await getMetaInfoForTopic(
        slugString,
        allMetaInfoPreval
    );

    let initialSearchContent: SearchItem[] | null = null;
    try {
        initialSearchContent = await getSearchContent({
            searchString: '',
            tagSlug: slugString,
            sortBy: defaultSortByType,
        });
    } catch (e) {
        Sentry.captureException(e);
    }

    let tertiaryNavItems = await getSideNav(slugString, allContentPreval);

    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );

    const content = await getL1L2Content(slugString, allContentPreval);
    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    let featured: ContentItem[] = [];
    try {
        featured = await getFeaturedForContent(content, slugString);
    } catch (e) {
        featured = await getFeaturedForContent(content, slugString, true); // Pull from preval.
        Sentry.captureException(e);
    }

    const crumbs = await getBreadcrumbsFromSlug(slugString, metaInfoForTopic);

    let relatedTopics: Tag[] = [];
    if (variant === 'light') {
        // Per Product, we are just putting all technologies as related.
        const related = allMetaInfoPreval.filter(
            ({ category }) => category === 'Technology'
        );
        relatedTopics = related.map(({ tagName, slug, category }) => ({
            name: tagName,
            slug,
            type: category,
        }));
        relatedTopics = relatedTopics
            .filter(({ name }) => name !== metaInfoForTopic?.tagName)
            .slice(0, 12);
    }

    const topics = metaInfoForTopic?.topics
        ? metaInfoForTopic.topics.map(({ tagName, slug, category }) => ({
              name: tagName,
              slug,
              type: category,
          }))
        : [];

    const data = {
        crumbs,
        name: metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '',
        slug: slugString,
        content,
        contentType: l1_l2,
        variant,
        tertiaryNavItems: tertiaryNavItems,
        featured: featured,
        description: metaInfoForTopic?.description
            ? metaInfoForTopic.description
            : '',
        ctas: metaInfoForTopic?.ctas ? metaInfoForTopic.ctas : [],
        topics,
        relatedTopics,
        initialSearchContent,
        pageNumber,
    };

    return data;
};
