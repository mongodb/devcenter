import type { NextPage } from 'next';

// import { fetchApiRest } from '../requests/strapi-api';
import { ArticleResponse } from '../interfaces/responses/article-response';

type HomeProps = { allArticles: ArticleResponse[] };

const Home: NextPage<HomeProps> = () => (
    <>
        <h1>MongoDB Developer Center test</h1>
    </>
);

export default Home;

// export async function getServerSideProps({}) {
//     const allArticles = (await fetchApiRest('articles')) || [];
//     return {
//         props: { allArticles },
//     };
// }
