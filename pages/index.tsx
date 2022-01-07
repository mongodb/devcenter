import type { NextPage } from 'next';
import Head from 'next/head';

import styled from '@emotion/styled';

import { fetchApiRest } from '../lib/strapiApi';

const Container = styled.main`
    display: grid;
`;

const Home: NextPage = ({ allArticles }) => {
    return (
        <div>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <h1>MongoDB Developer Center</h1>
                {allArticles.map(a => (
                    <div key={a._id}>{a.name}</div>
                ))}
            </Container>
        </div>
    );
};

export default Home;

export async function getServerSideProps({}) {
    const allArticles = (await fetchApiRest('articles')) || [];
    return {
        props: { allArticles },
    };
}
