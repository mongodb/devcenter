import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout } from '@mdb/flora';

import Hero from '../../components/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { ITopicCard } from '../../components/topic-card/types';
import { CTA } from '../../components/hero/types';

import { products } from '../../data/products';
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
    topics: ITopicCard[];
    relatedTopics: ITopicCard[];
    featured: ContentPiece[];
    content: ContentPiece[];
}

const Topic: NextPage<TopicProps> = ({
    name,
    description,
    ctas,
    topics,
    relatedTopics,
    featured,
    content,
    slug,
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

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';
    console.log(variant);

    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
            />
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],

                    rowGap: ['inc90', null, null, 'inc130'],
                }}
            >
                {(variant !== 'light' || topics.length > 0) && (
                    <div>
                        <GridLayout
                            sx={{ rowGap: ['inc90', null, null, 'inc130'] }}
                        >
                            {topics.length > 0 && (
                                <TopicCardsContainer
                                    topics={topics}
                                    title={`${name} Topics`}
                                />
                            )}
                            {variant !== 'light' && (
                                <FeaturedCardSection content={featured} />
                            )}
                            {variant === 'heavy' && (
                                <>
                                    {tutorials.length > 2 && (
                                        <CardSection
                                            content={tutorials}
                                            title="Tutorials"
                                        />
                                    )}
                                    {demoApps.length > 2 && (
                                        <CardSection
                                            content={demoApps}
                                            title="Demo Apps"
                                        />
                                    )}
                                    {articles.length > 2 && (
                                        <CardSection
                                            content={articles}
                                            title="Articles"
                                        />
                                    )}
                                    {videos.length > 2 && (
                                        <CardSection
                                            content={videos}
                                            title="Videos"
                                        />
                                    )}
                                    {podcasts.length > 2 && (
                                        <CardSection
                                            content={podcasts}
                                            title="Podcasts"
                                            direction="column"
                                        />
                                    )}
                                </>
                            )}
                        </GridLayout>
                    </div>
                )}
                <Search name={name} slug={slug} />

                {variant === 'light' && relatedTopics.length > 0 && (
                    <div>
                        <GridLayout>
                            <TopicCardsContainer
                                topics={relatedTopics}
                                title="Related Topics"
                            />
                        </GridLayout>
                    </div>
                )}
            </div>
        </>
    );
};

export default Topic;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = products.map(({ slug }) => ({ params: { slug } }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;

    const product = products.filter(p => p.slug === slug)[0];
    const { content, featured } = getL1Content(slug);

    const data = { ...product, featured, content };
    return { props: data };
};
