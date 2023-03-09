import Head from 'next/head';
import getConfig from 'next/config';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';
import { CacheProvider } from '@emotion/react';

import { OverlayProvider } from '../contexts/overlay';
import { ModalProvider } from '../contexts/modal';
import { NotificationsProvider } from '../contexts/notification';

import ModalRoot from '../components/modal';
import { NotificationsContainer } from '../components/notification';
import Layout from '../components/layout';
import ErrorBoundary from '../components/error-boundary';
import {
    getMetaDescr,
    getCanonicalUrl,
    shouldDefineDefaultCanonical,
} from '../utils/seo';
import { customCache } from '../utils/emotion';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('../../mocks/run-msw');
}

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
                <CacheProvider value={customCache(theme)}>
                    <ThemeProvider theme={theme}>
                        <NotificationsProvider>
                            <ModalProvider>
                                <OverlayProvider>
                                    <Layout pagePath={pagePath}>
                                        <ErrorBoundary>
                                            <ModalRoot />
                                            <NotificationsContainer />
                                            <Component {...pageProps} />
                                        </ErrorBoundary>
                                    </Layout>
                                </OverlayProvider>
                            </ModalProvider>
                        </NotificationsProvider>
                    </ThemeProvider>
                </CacheProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
