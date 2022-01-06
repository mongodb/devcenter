import type { NextPage } from 'next';
import Head from 'next/head';

import styled from '@emotion/styled';

const Container = styled.main`
    display: grid;
`;

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <h1>MongoDB Developer Center</h1>
            </Container>
        </div>
    );
};

export default Home;
