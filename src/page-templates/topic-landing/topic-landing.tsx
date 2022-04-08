import type { NextPage } from 'next';
import { GridLayout, SideNav } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';

import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import TertiaryNav from '../../components/tertiary-nav';

import { TopicLandingPageProps } from './types';
import { pillCategoryToSlug } from '../../utils/maps';

const sideNavStyles = (rowCount: number) => ({
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    // We have a variable amount of rows, but should have at least 3. If this is problematic, maybe we calculate the rows
    // before render and update this accordingly.
    gridRow: [null, null, null, null, `span ${rowCount}`],
});

const TopicLandingPage: NextPage<TopicLandingPageProps> = ({
    name,
    description,
    ctas,
    subTopics,
    relatedTopics,
    featured,
    content,
    slug,
    variant,
    tertiaryNavItems,
}) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: 'Products', url: '/' },
    ];

    const contentTypes = [
        'Article',
        'Tutorial',
        'Demo App',
        'Video',
        'Podcast',
    ];
    const contentRows =
        variant === 'heavy'
            ? contentTypes
                  .map(contentType =>
                      content.filter(piece => piece.category === contentType)
                  )
                  .filter(contentRow => contentRow.length > 2)
            : [];

    const topicsRow = subTopics.length > 0 ? 1 : 0;
    const featuredRow = variant === 'light' ? 0 : 1;
    const relatedTopicsRow = variant === 'light' ? 1 : 0;
    const searchRow = 1; // Search is always there.

    const mainGridDesktopRowsCount =
        topicsRow +
        featuredRow +
        contentRows.length +
        searchRow +
        relatedTopicsRow;

    const subTopicsWithHrefs = subTopics.map(
        ({ name, icon, slug, category }) => ({
            name,
            icon,
            href: `/${category}/${slug}`,
        })
    );

    const relatedTopicsWithHrefs = relatedTopics.map(
        ({ name, icon, slug, category }) => ({
            name,
            icon,
            href: `/${category}/${slug}`,
        })
    );

    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
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
                    {(variant !== 'light' || subTopics.length > 0) && (
                        <>
                            {subTopics.length > 0 && (
                                <TopicCardsContainer
                                    topics={subTopicsWithHrefs}
                                    title={`${name} Topics`}
                                />
                            )}
                            {variant !== 'light' && (
                                <FeaturedCardSection content={featured} />
                            )}
                            {variant === 'heavy' &&
                                contentRows.map(contentRow => {
                                    const contentType = contentRow[0].category;
                                    const direction =
                                        contentType === 'Podcast'
                                            ? 'column'
                                            : 'row';
                                    const contentTypeSlug =
                                        pillCategoryToSlug.get(contentType);
                                    return (
                                        <CardSection
                                            key={contentType}
                                            content={contentRow}
                                            title={`${contentRow[0].category}s`}
                                            direction={direction}
                                            allHref={`${slug}/${contentTypeSlug}`}
                                        />
                                    );
                                })}
                        </>
                    )}
                    <Search
                        title={`All ${name} Content`}
                        slug={slug}
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
                            topics={relatedTopicsWithHrefs}
                            title="Related Topics"
                        />
                    )}
                </GridLayout>
            </div>
        </>
    );
};

export default TopicLandingPage;
