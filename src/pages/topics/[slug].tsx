import type { NextPage } from 'next';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface HomeProps {
    slug: string;
}

const Topic: NextPage<HomeProps> = ({ slug }) => (
    <>
        <h1>MongoDB Developer Center</h1>
        <h2>{slug}</h2>
    </>
);

export default Topic;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [
        {
            params: { slug: 'topic1' },
        },
        {
            params: { slug: 'topic2' },
        },
    ];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    return { props: { slug } };
};
