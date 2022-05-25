import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout, SideNav, BrandedIcon } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { ITopicCard, TopicCardProps } from '../../components/topic-card/types';
import { CTA } from '../../components/hero/types';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { sideNavStyles } from '../../components/tertiary-nav/styles';
import { ContentItem } from '../../interfaces/content-item';
import { getL1L2Content } from '../../service/get-l1-l2-content';
import {
    pillCategoryToSlug,
    PillCategoryValues,
} from '../../types/pill-category';
import { getSideNav } from '../../service/get-side-nav';
import TertiaryNav from '../../components/tertiary-nav';
import { getDistinctTags } from '../../service/get-distinct-tags';
import { createTopicPageCTAS } from '../../components/hero/utils';

import { iconStyles } from '../../components/topic-card/styles';
import { setURLPathForNavItems } from '../../utils/format-url-path';

import { L1L2_TOPIC_PAGE_TYPES } from '../../data/constants';
import { parseContentToGetFeatured } from '../../utils/parse-content-to-get-featured';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { Crumb } from '../../components/breadcrumbs/types';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { productToLogo } from '../../utils/product-to-logo';
import { getAllMetaInfo } from '../../service/get-all-meta-info';
import { topicWithIcon } from '../../page-templates/content-type/technologies-section';
let pluralize = require('pluralize');

interface TopicProps {
    crumbs: Crumb[];
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: ITopicCard[];
    relatedTopics: TopicCardProps[];
    featured: ContentItem[];
    content: ContentItem[];
    contentType: string;
    variant: 'light' | 'medium' | 'heavy';
    tertiaryNavItems: TertiaryNavItem[];
}

const Topic: NextPage<TopicProps> = ({
    crumbs,
    name,
    slug,
    description,
    ctas,
    topics,
    relatedTopics,
    featured,
    content,
    contentType,
    variant,
    tertiaryNavItems,
}) => {
    const contentRows =
        variant === 'heavy'
            ? PillCategoryValues.map(contentType =>
                  content.filter(piece => piece.category === contentType)
              ).filter(contentRow => contentRow.length > 2)
            : [];

    const sortedContentRows: ContentItem[][] = [];

    contentRows.forEach(contentRow => {
        sortedContentRows.push(
            contentRow.sort((a, b) =>
                b.contentDate.localeCompare(a.contentDate)
            )
        );
    });

    const topicsRow = topics.length > 0 ? 1 : 0;
    const featuredRow = variant === 'light' ? 0 : 1;
    const relatedTopicsRow = variant === 'light' ? 1 : 0;
    const searchRow = 1; // Search is always there.

    const mainGridDesktopRowsCount =
        topicsRow +
        featuredRow +
        sortedContentRows.length +
        searchRow +
        relatedTopicsRow;

    const CTAComponents = createTopicPageCTAS(ctas);

    const topicToItem = (topic: ITopicCard) => {
        const iconName = productToLogo[topic.title];
        const icon = iconName ? (
            <BrandedIcon sx={iconStyles} name={iconName} />
        ) : null;
        return { ...topic, icon };
    };

    const topicItems = topics.map(topicToItem);

    const realtedTopicsWithIcons = relatedTopics.map(topicWithIcon);

    setURLPathForNavItems(tertiaryNavItems);

    let pageTitle = `${name} | MongoDB`;
    if (contentType === 'languages' || contentType === 'technologies') {
        pageTitle = `${name} and MongoDB`;
    } else if (contentType === 'products') {
        if (name.toLowerCase() === 'mongodb') {
            pageTitle = `Products | MongoDB`;
        }
        pageTitle = `MongoDB ${name}`;
    }

    return (
        <>
            <NextSeo title={pageTitle} />
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={CTAComponents}
            />
            <TertiaryNav items={tertiaryNavItems} topic={name} />
            <div
                sx={{
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: ['inc90', null, null, 'inc130'],
                    }}
                >
                    <div sx={sideNavStyles(mainGridDesktopRowsCount)}>
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    {(variant !== 'light' || topics.length > 0) && (
                        <>
                            {topics.length > 0 && (
                                <TopicCardsContainer
                                    topics={topicItems}
                                    title={`${name} Topics`}
                                />
                            )}
                            {variant !== 'light' && featured.length > 0 && (
                                <FeaturedCardSection content={featured} />
                            )}
                            {variant === 'heavy' &&
                                sortedContentRows.map(contentRow => {
                                    const contentType = contentRow[0].category;
                                    const contentTypeSlug =
                                        pillCategoryToSlug.get(contentType);
                                    const direction =
                                        contentType === 'Podcast'
                                            ? 'column'
                                            : 'row';
                                    return (
                                        <CardSection
                                            key={contentType}
                                            content={contentRow}
                                            title={`${name} ${pluralize(
                                                contentType
                                            )}`}
                                            href={slug + contentTypeSlug}
                                            direction={direction}
                                        />
                                    );
                                })}
                        </>
                    )}
                    <Search
                        title={`All ${name} Content`}
                        placeholder={`Search ${name} Content`}
                        tagSlug={slug}
                        sx={{
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                '4 / span 9',
                            ],
                        }}
                    />

                    {variant === 'light' && relatedTopics.length > 0 && (
                        <TopicCardsContainer
                            topics={realtedTopicsWithIcons}
                            title="Related Topics"
                        />
                    )}
                </GridLayout>
            </div>
        </>
    );
};

export default Topic;

interface IParams extends ParsedUrlQuery {
    l1_l2: string;
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any[] = [];

    const distinctTags = await getDistinctTags();

    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    distinctSlugs.forEach(distinctSlug => {
        const parsedSlug = distinctSlug.startsWith('/')
            ? distinctSlug.substring(1)
            : distinctSlug;
        const category = parsedSlug.split('/')[0];
        const slug = parsedSlug.split('/').slice(1);
        paths = paths.concat({
            params: { l1_l2: category, slug: slug },
        });
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { l1_l2, slug } = params as IParams;

    const slugString = '/' + l1_l2 + '/' + slug.join('/');

    const metaInfoForTopic = await getMetaInfoForTopic(slugString);

    const tertiaryNavItems = await getSideNav(slugString);

    const content = await getL1L2Content(slugString);

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    const featured = parseContentToGetFeatured(content);

    const crumbs = await getBreadcrumbsFromSlug(slugString);

    let relatedTopics: TopicCardProps[] = [];
    if (variant === 'light') {
        // Per Product, we are just putting all technologies as related.
        const allTags = await getAllMetaInfo();
        const related = allTags.filter(
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

    return { props: data };
};
