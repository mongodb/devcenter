import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';
import { CacheProvider } from '@emotion/react';
import { GTM_ID, pageView } from '../utils/gtm';
import { customCache } from '../utils/emotion';
import Layout from '../components/layout';
import ErrorBoundary from '../components/error-boundary';
import { OverlayProvider } from '../contexts/overlay';
import { getMetaDescr, getCanonicalUrl } from '../utils/seo';

interface CustomProps {
    session?: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { asPath, route } = router;

    let pagePath = route === '/_error' ? null : asPath;
    let pageDescription = getMetaDescr(publicRuntimeConfig, route, asPath);
    let canonicalUrl = getCanonicalUrl(publicRuntimeConfig, route, asPath);

    // Is used to track route changes and send page views to Google Tag Manager
    useEffect(() => {
        router.events.on('routeChangeComplete', pageView);
        return () => {
            router.events.off('routeChangeComplete', pageView);
        };
    }, [router.events]);

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
            <Script
                id="optimizely"
                strategy="beforeInteractive"
                src="https://cdn.optimizely.com/js/15508090763.js"
            />
            {/* Google Tag Manager - Global base code */}
            <Script
                id="gtag-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${GTM_ID}');
                `,
                }}
            />
            <SessionProvider
                session={session}
                basePath="/developer/api/auth/"
                refetchOnWindowFocus={true}
                refetchInterval={0}
            >
                <ThemeProvider theme={theme}>
                    <CacheProvider value={customCache(theme)}>
                        <OverlayProvider>
                            <Layout pagePath={pagePath}>
                                <ErrorBoundary>
                                    <Component {...pageProps} />
                                </ErrorBoundary>
                            </Layout>
                        </OverlayProvider>
                    </CacheProvider>
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
