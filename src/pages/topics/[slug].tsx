import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout, SideNav } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { CTA } from '../../components/hero/types';

import getL1Content from '../../requests/get-l1-content';
import { ContentPiece } from '../../interfaces/content-piece';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import TertiaryNav from '../../components/tertiary-nav';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: string[];
    featured: ContentPiece[];
    content: ContentPiece[];
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
    featured,
    content,
    slug,
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
    const contentRows = contentTypes
        .map(contentType =>
            content.filter(piece => piece.category === contentType)
        )
        .filter(contentRow => contentRow.length > 2);

    const mainGridDesktopRowsCount = contentRows.length + 2; // Content rows + topics + featured

    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
            />
            <TertiaryNav items={tertiaryNavItems} topic={name} />
            <div sx={{ padding: ['inc40', null, 'inc50', 'inc70'] }}>
                <GridLayout sx={{ rowGap: ['inc90', null, 'inc130'] }}>
                    <div sx={sideNavStyles(mainGridDesktopRowsCount)}>
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    <TopicCardsContainer topics={topics} name={name} />
                    <FeaturedCardSection content={featured} />
                    {contentRows.map(contentRow => {
                        const contentType = contentRow[0].category;
                        const direction =
                            contentType === 'Podcast' ? 'column' : 'row';
                        return (
                            <CardSection
                                key={contentType}
                                content={contentRow}
                                title={`${contentRow[0].category}s`}
                                direction={direction}
                            />
                        );
                    })}
                </GridLayout>
            </div>
            <Search name={name} />
        </>
    );
};

export default Topic;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [
        {
            params: { slug: 'atlas' },
        },
    ];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const products = [
        {
            name: 'Atlas',
            slug: 'atlas',
            description:
                'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
            ctas: [
                { text: 'Primary CTA', url: 'https://www.mongodb.com/atlas' },
                {
                    text: 'Secondary CTA',
                    url: 'https://www.mongodb.com/cloud/atlas/register',
                },
            ],
            topics: [
                'Aggregation',
                'Atlas Search',
                'Charts',
                'Other Topic Here',
            ],
        },
    ];
    const product = products.filter(p => p.slug === slug)[0];
    const { content, featured } = getL1Content();

    const tertiaryNavItems: TertiaryNavItem[] = [
        {
            title: 'Quickstarts',
            url: `/products/${slug}/quickstarts`,
        },
        {
            title: `Articles`,
            url: `/products/${slug}/articles`,
        },
        {
            title: `Courses`,
            url: `/products/${slug}/courses`,
        },
        {
            title: `Community Discussion`,
            url: `https://www.mongodb.com/community/forums/`,
        },
        {
            title: `Documentation`,
            url: `https://docs.mongodb.com/`,
        },
        {
            title: `News & Announcements`,
            url: `https://www.mongodb.com/news`,
        },
        {
            title: `Demo Apps`,
            url: `/products/${slug}/demoapps`,
        },
        {
            title: `Stack Overflow`,
            url: `https://stackoverflow.com/`,
        },
        {
            title: `Podcasts`,
            url: `/products/${slug}/podcasts`,
        },
        {
            title: `Tutorials`,
            url: `/products/${slug}/tutorials`,
        },
        {
            title: `Videos`,
            url: `/products/${slug}/videos`,
        },
    ];

    const data = { ...product, featured, content, tertiaryNavItems, slug };
    return { props: data };
};
