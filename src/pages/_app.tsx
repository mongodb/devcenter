import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
