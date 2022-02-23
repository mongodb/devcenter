import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';

import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
