import * as Sentry from '@sentry/nextjs';
import { TopicCardProps } from '../../components/topic-card/types';
import { ContentItem } from '../../interfaces/content-item';
import { SearchQueryResponse, SortByType } from '../../components/search/types';
import { getSideNav } from '../../service/get-side-nav';
import { getSearchContent } from '../../api-requests/get-all-search-content';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import {
    buildSearchQuery,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';
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

    const searchContentQueryParams = {
        searchString: '',
        tagSlug: slugString,
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

    let relatedTopics: TopicCardProps[] = [];
    if (variant === 'light') {
        // Per Product, we are just putting all technologies as related.
        const related = allMetaInfoPreval.filter(
            ({ category }) => category === 'Technology'
        );
        relatedTopics = related.map(({ tagName, slug }) => ({
            title: tagName,
            href: slug,
            icon: null,
        }));
        relatedTopics = relatedTopics
            .filter(({ title }) => title !== metaInfoForTopic?.tagName)
            .slice(0, 12);
    }

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
        topics: metaInfoForTopic?.topics ? metaInfoForTopic.topics : [],
        relatedTopics,
        swrFallback: {
            [initialSearchContentKey]: initialSearchContent,
        },
        pageNumber,
    };

    return data;
};
