import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Hero from '../../components/hero';
import { CTA } from '../../interfaces/components/hero';
import SharedCard from '../../components/cards/shared-card';
import FeatureCard from '../../components/cards/featured-card';
import React from 'react';
import { PillCategory } from '../../types/pill-category';
import getL1Content from '../../requests/get-l1-content';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
}

const Topic: NextPage<TopicProps> = ({ name, description, ctas }) => {
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
                {contentCategories.map(c =>
                    getL1Content()
                        .filter(a => a.pillCategory == c)
                        .map(d => (
                            <SharedCard
                                key={d.title}
                                pillCategory={d.pillCategory}
                                thumbnail={d.thumbnail}
                                title={d.title}
                                description={d.description}
                                contentDate={d.contentDate}
                            />
                        ))
                )}
            </div>
            <div style={{}}>
                {contentCategories.map(c =>
                    getL1Content()
                        .filter(a => a.pillCategory == c)
                        .map(d => (
                            <FeatureCard
                                key={d.title}
                                pillCategory={d.pillCategory}
                                thumbnail={d.thumbnail}
                                title={d.title}
                                description={d.description}
                                tags={d.tags}
                                contentDate={d.contentDate}
                            />
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
        },
    ];
    const data = products.filter(p => p.slug === slug)[0];

    return { props: data };
};
