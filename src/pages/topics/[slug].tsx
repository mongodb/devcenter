import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Hero from '../../components/hero';
import { CTA } from '../../interfaces/components/hero';
import FeatureCard from '../../components/cards/featurecard/featured-card';
import React from 'react';
import { PillCategory } from '../../types/pill-category';
import getL1Content from '../../requests/get-l1-content';
import SharedCard from '../../components/cards/sharedcard/shared-card';
import { CardContent } from '../../interfaces/card-content';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    results: CardContent[];
}

const Topic: NextPage<TopicProps> = ({ name, description, ctas, results }) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: 'Products', url: '/topics' },
    ];
    const contentCategories: PillCategory[] = [
        'ARTICLE',
        'VIDEO',
        'DEMO APP',
        'TUTORIAL',
    ];

    return (
        <>
            <Hero
                crumbs={crumbs}
                name={name}
                description={description}
                ctas={ctas}
            />
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                }}
            >
                {contentCategories.map((category: PillCategory) =>
                    results
                        .filter(
                            (result: CardContent) =>
                                result.pillCategory === category
                        )
                        .map((result: CardContent) => (
                            <SharedCard
                                key={result.title}
                                pillCategory={result.pillCategory}
                                thumbnail={result.thumbnail}
                                title={result.title}
                                description={result.description}
                                contentDate={result.contentDate}
                            />
                        ))
                )}
            </div>
            <div style={{}}>
                {contentCategories.map((category: PillCategory) =>
                    results
                        .filter(
                            (result: CardContent) =>
                                result.pillCategory === category
                        )
                        .map((result: CardContent) => (
                            <div style={{ margin: '20px' }} key={result.title}>
                                <FeatureCard
                                    key={result.title}
                                    pillCategory={result.pillCategory}
                                    thumbnail={result.thumbnail}
                                    title={result.title}
                                    description={result.description}
                                    tags={result.tags}
                                    contentDate={result.contentDate}
                                />
                            </div>
                        ))
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
            results: getL1Content(),
        },
    ];
    const data = products.filter(p => p.slug === slug)[0];

    return { props: data };
};
