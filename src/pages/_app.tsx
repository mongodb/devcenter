import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';
import { GTM_ID, pageView } from '../utils/gtm';
import Layout from '../components/layout';
import { getSession, SessionProvider } from 'next-auth/react';
import App from 'next/app';
import { Session } from 'next-auth';

const CONTENT_ROUTE = '/[...slug]';

interface CustomProps {
    session: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { asPath, route } = router;
    let pageDescription = null;
    if (asPath in publicRuntimeConfig.pageDescriptions) {
        pageDescription = publicRuntimeConfig.pageDescriptions[asPath];
    } else if (route !== CONTENT_ROUTE) {
        // if no mapping found, set default meta description to that of the homepage
        pageDescription = publicRuntimeConfig.pageDescriptions['/'];
    }

    let canonicalUrl = null;
    if (route !== '/_error' && route !== CONTENT_ROUTE) {
        canonicalUrl = publicRuntimeConfig.absoluteBasePath + asPath;
    }

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
            <SessionProvider session={session} refetchInterval={0}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

// MyApp.getInitialProps = async (
//     appContext: AppContext
// ): Promise<AppInitialProps & CustomProps> => {
//     const appProps = await App.getInitialProps(appContext);
//     const session = (await getSession(appContext.ctx)) as Session;
//     return { ...appProps, session };
// };

export default MyApp;
