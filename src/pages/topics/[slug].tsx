import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { CTA } from '../../interfaces/components/hero';

import getL1Content from '../../requests/get-l1-content';
import { ContentPiece } from '../../interfaces/content-piece';
import CardSection, {
    FeaturedCardSection,
} from '../../components/card-section';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: string[];
    featured: ContentPiece[];
    content: ContentPiece[];
}

const Topic: NextPage<TopicProps> = ({
    name,
    description,
    ctas,
    topics,
    featured,
    content,
}) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: 'Products', url: '/topics' },
    ];
    const articles = content.filter(piece => piece.category === 'Article');
    const tutorials = content.filter(piece => piece.category === 'Tutorial');
    const demoApps = content.filter(piece => piece.category === 'Demo App');
    const videos = content.filter(piece => piece.category === 'Video');
    const podcasts = content.filter(piece => piece.category === 'Podcast');
    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
            />
            <div sx={{ padding: ['inc40', null, 'inc50', 'inc70'] }}>
                <GridLayout sx={{ rowGap: ['inc90', null, 'inc130'] }}>
                    <TopicCardsContainer topics={topics} name={name} />
                    <FeaturedCardSection content={featured} />
                    {tutorials.length > 2 && (
                        <CardSection content={tutorials} title="Tutorials" />
                    )}
                    {demoApps.length > 2 && (
                        <CardSection content={demoApps} title="Demo Apps" />
                    )}
                    {articles.length > 2 && (
                        <CardSection content={articles} title="Articles" />
                    )}
                    {videos.length > 2 && (
                        <CardSection content={videos} title="Videos" />
                    )}
                    {podcasts.length > 2 && (
                        <CardSection content={podcasts} title="Podcasts" />
                    )}
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

    const data = { ...product, featured, content };
    return { props: data };
};
