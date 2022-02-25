import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GridLayout } from '@mdb/flora';

import Hero from '../../components/hero/hero';
import Search from '../../components/search';
import { TopicCardsContainer } from '../../components/topic-card';
import { CTA } from '../../interfaces/components/hero';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    topics: string[];
}

const Topic: NextPage<TopicProps> = ({ name, description, ctas, topics }) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: 'Products', url: '/topics' },
    ];
    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
            />
            <div sx={{ padding: ['inc40', null, 'inc50', 'inc70'] }}>
                <GridLayout>
                    <TopicCardsContainer topics={topics} name={name} />
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
    const data = products.filter(p => p.slug === slug)[0];

    return { props: data };
};
