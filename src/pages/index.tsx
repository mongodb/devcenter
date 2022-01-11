import type { NextPage } from 'next';
import Head from 'next/head';

import styled from '@emotion/styled';

// import { fetchApiRest } from '../requests/strapi-api';
import { ArticleResponse } from '../interfaces/responses/article-response';

const Container = styled.main`
    display: grid;
`;

type HomeProps = { allArticles: ArticleResponse[] };

const Home: NextPage<HomeProps> = () => {
    return (
        <div>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <h1>MongoDB Developer Center Test Commit</h1>
            </Container>
        </div>
    );
};

export default Home;

// export async function getServerSideProps({}) {
//     const allArticles = (await fetchApiRest('articles')) || [];
//     return {
//         props: { allArticles },
//     };
// }
