import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout, SideNav } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { ITopicCard } from '../../components/topic-card/types';
import { CTA } from '../../components/hero/types';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';
import { L1L2_TOPIC_PAGE_TYPES } from '../../data/constants';
import { getL1L2Content } from '../../service/get-l1-l2-content';
import { PillCategoryValues } from '../../types/pill-category';
import { capitalizeFirstLetter } from '../../utils/format-string';
import { getAllContentItems } from '../../service/get-all-content';
import { getSideNav } from '../../service/get-side-nav';
import TertiaryNav from '../../components/tertiary-nav';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: ITopicCard[];
    relatedTopics: ITopicCard[];
    featured: ContentItem[];
    content: ContentItem[];
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
    slug,
    description,
    ctas,
    topics,
    relatedTopics,
    featured,
    content,
    variant,
    tertiaryNavItems,
}) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: 'Products', url: '/' },
    ];

    const contentRows =
        variant === 'heavy'
            ? PillCategoryValues.map(contentType =>
                  content.filter(piece => piece.category === contentType)
              ).filter(contentRow => contentRow.length > 2)
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
                            {variant !== 'light' && featured.length > 0 && (
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

    const contents: ContentItem[] = await getAllContentItems();

    const l1l2Tags: Tag[][] = contents.map(c => c.tags);

    const flattenedL1L2Tags: Tag[] = [];

    l1l2Tags.forEach(tags => {
        tags.forEach(tag => flattenedL1L2Tags.push(tag));
    });

    const slugs: string[] = flattenedL1L2Tags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    const distinctSlugs = Array.from(new Set(slugs));

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

    const name = capitalizeFirstLetter(slug[slug.length - 1]);

    const slugString = '/' + l1_l2 + '/' + slug.join('/');

    const tertiaryNavItems = await getSideNav(slugString);

    const content = await getL1L2Content(slugString);

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    const data = {
        name,
        slug: slugString,
        content,
        variant,
        tertiaryNavItems: tertiaryNavItems,
        //TODO
        description: 'Description',
        ctas: [],
        topics: [],
        relatedTopics: [],
        featured: [],
    };

    return { props: data };
};
