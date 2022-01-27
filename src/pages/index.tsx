import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({}) => {
    const articlesModule = await import('../requests/articles'); // Dynamic import to allow unit testing without importing this.
    const articles = await articlesModule.getArticles();
    return {
        props: { articles },
    };
};
