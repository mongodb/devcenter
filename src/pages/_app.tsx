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
import {
    getMetaDescr,
    getCanonicalUrl,
    shouldDefineDefaultCanonical,
} from '../utils/seo';
import ModalRoot from '../components/modal';
import { ModalProvider } from '../contexts/modal';

interface CustomProps {
    session?: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { absoluteBasePath } = publicRuntimeConfig;
    const { asPath, route } = router;

    const pagePath = route === '/_error' ? null : asPath;
    // Attributes for SEO may be overridden at the component-level if needed with NextSeo.
    const pageDescription = getMetaDescr(publicRuntimeConfig, route, asPath);
    const canonicalUrl = shouldDefineDefaultCanonical(route)
        ? getCanonicalUrl(absoluteBasePath, asPath)
        : null;

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
                <ModalProvider>
                    <ModalRoot />
                    <CacheProvider value={customCache(theme)}>
                        <ThemeProvider theme={theme}>
                            <OverlayProvider>
                                <Layout pagePath={pagePath}>
                                    <ErrorBoundary>
                                        <Component {...pageProps} />
                                    </ErrorBoundary>
                                </Layout>
                            </OverlayProvider>
                        </ThemeProvider>
                    </CacheProvider>
                </ModalProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
