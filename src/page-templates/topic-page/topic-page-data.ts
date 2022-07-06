import { TopicCardProps } from '../../components/topic-card/types';
import { getL1L2Content } from '../../service/get-l1-l2-content';
import { getSideNav } from '../../service/get-side-nav';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import allMetaInfo from '../../service/get-all-meta-info.preval';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import { getFeaturedForContent } from '../../service/get-featured-for-content';

export const getTopicPageData = async (l1_l2: string, slug: string[]) => {
    const slugString = '/' + l1_l2 + '/' + slug.join('/');

    const metaInfoForTopic = await getMetaInfoForTopic(slugString);

    let tertiaryNavItems = await getSideNav(slugString);

    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );

    const content = await getL1L2Content(slugString);

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    const featured = await getFeaturedForContent(content, slugString);

    const crumbs = await getBreadcrumbsFromSlug(slugString);

    let relatedTopics: TopicCardProps[] = [];
    if (variant === 'light') {
        // Per Product, we are just putting all technologies as related.
        const related = allMetaInfo.filter(
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
    };

    return data;
};
