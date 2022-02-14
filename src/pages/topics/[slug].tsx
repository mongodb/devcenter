import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from '@emotion/styled'; // TEMPORARY

import Hero from '../../components/hero';

const HeroSection = styled('div')`
    background: #f9ebff;
`;
interface TopicProps {
    name: string;
    slug: string;
}

const Topic: NextPage<TopicProps> = ({ name }) => {
    const crumbs = [
        { text: 'MongoDB Developer Center', url: '/' },
        { text: 'Developer Topics', url: '/topics' },
        { text: name },
    ];
    return (
        <>
            <HeroSection>
                <Hero crumbs={crumbs} />
            </HeroSection>
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
        },
    ];
    const data = products.filter(p => p.slug === slug)[0];

    return { props: data };
};
