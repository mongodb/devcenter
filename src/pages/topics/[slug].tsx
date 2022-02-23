import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { GridLayout } from '@mdb/flora';
import Hero from '../../components/hero';
import Search from '../../components/search/search';
import { CTA } from '../../interfaces/components/hero';
import FeatureCard from '../../components/cards/featured-card';
import React from 'react';
import getL1Content from '../../requests/get-l1-content';
import { dataStyles } from '../../components/search/styles';
import SliderCards from '../../components/slider-cards/slider-cards';
import { CONTENT_CATEGORIES } from '../../data/content-category';
import { CardContent } from '../../interfaces/cardContent';

interface TopicProps {
    name: string;
    slug: string;
    description: string;
    ctas: CTA[];
    content: CardContent[];
}

const PageGrid = styled(GridLayout)`
    padding: ${theme.space.inc70};
    row-gap: 0;
`;

const Topic: NextPage<TopicProps> = ({ name, description, ctas, content }) => {
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
            <PageGrid>
                <SliderCards data={content} />
                <Search name={name} />
                <div sx={dataStyles}>
                    {content
                        .filter((a: CardContent) =>
                            CONTENT_CATEGORIES.includes(a.pillCategory)
                        )
                        .map((d: CardContent) => (
                            <div sx={{ width: '100%' }} key={d.title}>
                                <FeatureCard
                                    key={d.title}
                                    pillCategory={d.pillCategory}
                                    thumbnail={d.thumbnail}
                                    title={d.title}
                                    description={d.description}
                                    tags={d.tags}
                                    contentDate={d.contentDate}
                                />
                            </div>
                        ))}
                </div>
            </PageGrid>
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
            content: getL1Content(),
        },
    ];
    const data = products.filter(p => p.slug === slug)[0];

    return { props: data };
};
