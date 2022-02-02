import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import { clientFactory } from '../utils/client-factory';
import getArticles from '../requests/get-articles';
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
    const client = clientFactory('ApolloREST', process.env.STRAPI_URL);
    const articles = await getArticles(client);
    return {
        props: { articles },
    };
};
