import type { AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';

import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();

    let canonicalUrl = null;
    if (router.route !== '/_error') {
        canonicalUrl = publicRuntimeConfig.absoluteBasePath + router.asPath;
    }

    return (
        <>
            <Head>
                <title>MongoDB Developer Center</title>
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/developer/favicon.ico" />
                {canonicalUrl && (
                    <link rel="canonical" href={`${canonicalUrl}`} />
                )}
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
