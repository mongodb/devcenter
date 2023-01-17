import { BrandedIcon, GridLayout, SideNav, TypographyScale } from '@mdb/flora';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Crumb } from '../../components/breadcrumbs/types';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import Hero from '../../components/hero';
import { CTA } from '../../components/hero/types';
import { createTopicPageCTAS } from '../../components/hero/utils';
import { SearchBox, SearchResults, SortBox } from '../../components/search';
import { SearchItem } from '../../components/search/types';
import TertiaryNav from '../../components/tertiary-nav';
import { sideNavStyles } from '../../components/tertiary-nav/styles';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { TopicCardsContainer } from '../../components/topic-card';
import { iconStyles } from '../../components/topic-card/styles';
import { ITopicCard, TopicCardProps } from '../../components/topic-card/types';
import { ContentItem } from '../../interfaces/content-item';
import { topicWithIcon } from '../content-type-page/sections/technologies';
import {
    pillCategoryToSlug,
    PillCategoryValues,
} from '../../types/pill-category';
import { addExternalIconToSideNav } from '../../utils/page-template-helpers';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { productToLogo } from '../../utils/product-to-logo';
import { useSearchMeta } from '../../hooks/search/meta';
import useSearch from '../../hooks/search';
import {
    searchWrapperStyles,
    titleStyles,
} from '../../components/search/styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

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

const extraSearchBoxStyles = {
    marginBottom: ['0', null, 'inc50'],
};
const extraSortBoxStyles = {
    display: 'block',
    flexBasis: ['100%', null, 'calc(33% - 12px)'],
};
const extraSearchWrapperStyles = {
    ...searchWrapperStyles,
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
};

const buildPageTitle =
    (contentType: string, name: string) => (pageNumber: number) => {
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
    };

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
                (Array.isArray(b.contentDate)
                    ? b.contentDate[0]
                    : b.contentDate
                ).localeCompare(
                    (Array.isArray(a.contentDate)
                        ? a.contentDate[0]
                        : a.contentDate) as string
                )
            )
        );
    });

    const { pageTitle, metaDescr, canonicalUrl, updatePageMeta } =
        useSearchMeta(
            pageNumber,
            slug,
            contentType,
            buildPageTitle(contentType, name)
        );

    const { searchStringProps, sortProps, resultsProps } = useSearch(
        initialSearchContent,
        updatePageMeta,
        undefined,
        slug
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

    return (
        <>
            <NextSeo
                title={pageTitle}
                canonical={canonicalUrl}
                {...(metaDescr ? { description: metaDescr } : {})}
            />
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={CTAComponents}
                topicPage={true}
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
                                <FeaturedCardSection
                                    content={featured}
                                    featuredCardType="large"
                                />
                            )}
                            {variant === 'heavy' &&
                                sortedContentRows.map(contentRow => {
                                    const contentType =
                                        contentRow[0].collectionType === 'Event'
                                            ? 'Event'
                                            : contentRow[0].category;
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

                    <div sx={extraSearchWrapperStyles}>
                        <div sx={titleStyles}>
                            <TypographyScale
                                variant="heading5"
                                customElement="h5"
                            >
                                All {name} Content
                            </TypographyScale>
                        </div>

                        <SearchBox
                            {...searchStringProps}
                            placeholder={`Search ${name} Content`}
                            extraStyles={extraSearchBoxStyles}
                        />

                        <SortBox
                            {...sortProps}
                            extraStyles={extraSortBoxStyles}
                        />

                        <SearchResults
                            {...resultsProps}
                            pageNumber={pageNumber}
                            slug={slug}
                            updatePageMeta={updatePageMeta}
                            contentType={contentType}
                            extraStyles={{
                                marginTop: ['inc30', null, 0],
                            }}
                        />
                    </div>

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
