import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@mdb/flora/theme';
import { ThemeProvider } from '@theme-ui/core';
import { GTM_ID, pageView } from '../lib/gtm';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    // Is used to track route changes and send page views to Google Tag Manager
    const router = useRouter();
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
                <meta name="description" content="MongoDB Developer Center" />
                <link rel="icon" href="/developer/favicon.ico" />
            </Head>
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
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
