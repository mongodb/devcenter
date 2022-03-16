import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout, SideNav } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { ITopicCard } from '../../components/topic-card/types';
import { CTA } from '../../components/hero/types';

import getL1Content from '../../requests/get-l1-content';
import getTertiaryNavItems from '../../requests/get-tertiary-nav-items';

import { ContentPiece } from '../../interfaces/content-piece';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import TertiaryNav from '../../components/tertiary-nav';
import { taxonomyData } from '../../data/taxonomy-data';
import { Taxonomy } from '../../interfaces/taxonomy';
import { taxonomyToCategoryMapping } from '../../data/taxonomy-collection-types';
import getTaxonomyData from '../../requests/get-taxonomy-data';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: ITopicCard[];
    relatedTopics: ITopicCard[];
    featured: ContentPiece[];
    content: ContentPiece[];
    variant: 'light' | 'medium' | 'heavy';
    tertiaryNavItems: TertiaryNavItem[];
}

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

const Topic: NextPage<TopicProps> = ({
    name,
    description,
    ctas,
    topics,
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
        { text: 'Products', url: '/topics' },
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

    const topicsRow = topics.length > 0 ? 1 : 0;
    const featuredRow = variant === 'light' ? 0 : 1;
    const relatedTopicsRow = variant === 'light' ? 1 : 0;
    const searchRow = 1; // Search is always there.

    const mainGridDesktopRowsCount =
        topicsRow +
        featuredRow +
        contentRows.length +
        searchRow +
        relatedTopicsRow;

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
                    {(variant !== 'light' || topics.length > 0) && (
                        <>
                            {topics.length > 0 && (
                                <TopicCardsContainer
                                    topics={topics}
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
                                    return (
                                        <CardSection
                                            key={contentType}
                                            content={contentRow}
                                            title={`${contentRow[0].category}s`}
                                            direction={direction}
                                        />
                                    );
                                })}
                        </>
                    )}
                    <Search
                        name={name}
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
                            topics={relatedTopics}
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
    taxonomyData.forEach((value: Taxonomy[], key: string) => {
        const category = taxonomyToCategoryMapping[key];
        paths = paths.concat(
            value.map(({ slug }) => ({
                params: { l1_l2: category, slug: slug.split('/') },
            }))
        );
    });
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const slugString = slug.join('/');
    const product = getTaxonomyData(slugString);
    const tertiaryNavItems = getTertiaryNavItems(slugString);
    const { content, featured } = getL1Content(slugString);

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    const data = {
        ...product,
        featured,
        content,
        tertiaryNavItems,
        slug: slugString,
        variant,
    };
    return { props: data };
};
