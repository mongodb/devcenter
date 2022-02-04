import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fetch from 'node-fetch';

import { Article } from '../interfaces/article';

interface HomeProps {
    articles: Article[];
}

const Home: NextPage<HomeProps> = ({ articles }) => (
    <>
        <h1>MongoDB Developer Center</h1>
        <h2>Articles</h2>
        <ul>
            {articles.map(a => (
                <li key={a.slug}>
                    <h3>{a.name}</h3>
                    <p>{a.description}</p>
                </li>
            ))}
        </ul>
    </>
);

export default Home;

export const getStaticProps: GetStaticProps = async ({}) => {
    const articlesResponse = await fetch(
        `${process.env.API_GATEWAY_URL}/articles`
    );
    const { articles } = (await articlesResponse.json()) as {
        articles: Article[];
    };
    return {
        props: { articles },
    };
};
