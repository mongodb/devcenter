import { useState, useCallback } from 'react';
import { BrandedIcon, GridLayout, SideNav } from '@mdb/flora';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { NextSeo } from 'next-seo';
import { Crumb } from '../../components/breadcrumbs/types';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import Hero from '../../components/hero';
import { CTA } from '../../components/hero/types';
import { createTopicPageCTAS } from '../../components/hero/utils';
import Search from '../../components/search';
import { SearchItem } from '../../components/search/types';
import TertiaryNav from '../../components/tertiary-nav';
import { sideNavStyles } from '../../components/tertiary-nav/styles';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { TopicCardsContainer } from '../../components/topic-card';
import { iconStyles } from '../../components/topic-card/styles';
import { ITopicCard, TopicCardProps } from '../../components/topic-card/types';
import { ContentItem } from '../../interfaces/content-item';
import { topicWithIcon } from '../../page-templates/content-type/technologies-section';
import {
    PillCategory,
    pillCategoryToSlug,
    PillCategoryValues,
} from '../../types/pill-category';
import { addExternalIconToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { productToLogo } from '../../utils/product-to-logo';

export interface TopicContentTypeProps {
    crumbs: Crumb[];
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    topicSlug: string;
    contentTypeSlug: string;
    contentTypeAggregateSlug: string;
    description: string;
    subTopics: ITopicCard[];
}

let pluralize = require('pluralize');

interface TopicPageProps {
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
    initialSearchContent?: SearchItem[];
    pageNumber: number;
}

const TopicPageTemplate: NextPage<TopicPageProps> = ({
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
    initialSearchContent,
    pageNumber,
}) => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
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

    const buildPageTitle = useCallback(
        (pageNumber: number) => {
            const titlePageNo = pageNumber > 1 ? ` - Page ${pageNumber} ` : '';
            let pageTitle = `${name} ${titlePageNo} | MongoDB`;
            if (contentType === 'languages' || contentType === 'technologies') {
                pageTitle = `${name} and MongoDB ${titlePageNo}`;
            } else if (contentType === 'products') {
                if (name.toLowerCase() === 'mongodb') {
                    pageTitle = `Product ${titlePageNo} | MongoDB`;
                } else {
                    pageTitle = `MongoDB ${name} ${titlePageNo}`;
                }
            }
            return pageTitle;
        },
        [contentType, name]
    );

    const [pageTitle, setPageTitle] = useState(buildPageTitle(pageNumber));

    const updatePageTitle = useCallback(
        pageNumber => {
            const pageTitle = buildPageTitle(pageNumber);
            setPageTitle(pageTitle);
        },
        [buildPageTitle]
    );

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

    tertiaryNavItems = addExternalIconToSideNav(
        tertiaryNavItems,
        'documentation'
    );

    const canonicalUrl = publicRuntimeConfig.absoluteBasePath + router.asPath;

    return (
        <>
            <NextSeo title={pageTitle} canonical={canonicalUrl} />
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
                        pageNumber={pageNumber}
                        pageSlug={slug.split('/')}
                        updatePageTitle={updatePageTitle}
                        initialSearchContent={initialSearchContent}
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

export default TopicPageTemplate;
