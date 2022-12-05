import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';
import { CacheProvider } from '@emotion/react';
import { customCache } from '../utils/emotion';
import Layout from '../components/layout';
import ErrorBoundary from '../components/error-boundary';
import { OverlayProvider } from '../contexts/overlay';
import { RequestContentModalProvider } from '../contexts/request-content-modal';
import {
    getMetaDescr,
    getCanonicalUrl,
    shouldDefineDefaultCanonical,
} from '../utils/seo';

interface CustomProps {
    session?: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath } = publicRuntimeConfig;
    const { asPath, route } = router;

    let pagePath = route === '/_error' ? null : asPath;
    // Attributes for SEO may be overridden at the component-level if needed with NextSeo.
    let pageDescription = getMetaDescr(publicRuntimeConfig, route, asPath);
    let canonicalUrl = shouldDefineDefaultCanonical(route)
        ? getCanonicalUrl(absoluteBasePath, asPath)
        : null;

    console.log('test');

    return (
        <>
            <Head>
                <title>MongoDB Developer Center</title>
                {pageDescription && (
                    <meta name="description" content={pageDescription} />
                )}
                <link rel="icon" href="/developer/favicon.ico" />
                {canonicalUrl && (
                    <link rel="canonical" href={`${canonicalUrl}`} />
                )}
            </Head>
            <SessionProvider
                session={session}
                basePath="/developer/api/auth/"
                refetchOnWindowFocus={true}
                refetchInterval={0}
            >
                <CacheProvider value={customCache(theme)}>
                    <ThemeProvider theme={theme}>
                        <OverlayProvider>
                            <RequestContentModalProvider>
                                <Layout pagePath={pagePath}>
                                    <ErrorBoundary>
                                        <Component {...pageProps} />
                                    </ErrorBoundary>
                                </Layout>
                            </RequestContentModalProvider>
                        </OverlayProvider>
                    </ThemeProvider>
                </CacheProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
