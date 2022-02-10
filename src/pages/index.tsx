import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { Article } from '../interfaces/article';
import getArticles from '../requests/get-articles';

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
    const articles = await getArticles();
    return {
        props: { articles },
    };
};
