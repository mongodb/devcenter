import type { NextPage } from 'next';

// import { fetchApiRest } from '../requests/strapi-api';
import { ArticleResponse } from '../interfaces/responses/article-response';
import NavBar from '../components/subnavigation/navbar';

type HomeProps = { allArticles: ArticleResponse[] };

const Home: NextPage<HomeProps> = () => (
    <>
        <NavBar />
        <h1>MongoDB Developer Center</h1>
    </>
);

export default Home;

// export async function getServerSideProps({}) {
//     const allArticles = (await fetchApiRest('articles')) || [];
//     return {
//         props: { allArticles },
//     };
// }
