import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GTM_ID } from '../utils/gtm';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="dns-prefetch preconnect"
                        href="https://www.google-analytics.com"
                    />
                    <link
                        rel="dns-prefetch preconnect"
                        href="https://www.googletagmanager.com"
                    />
                    <link
                        rel="dns-prefetch preconnect"
                        href="https://cdn.optimizely.com/js/22247140071.js"
                    />
                    <link
                        rel="dns-prefetch preconnect"
                        href="https://logx.optimizely.com"
                    />

                    <link
                        href={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
                        rel="preload"
                        as="script"
                    ></link>
                    <link
                        rel="preload"
                        href="https://cdn.optimizely.com/js/22247140071.js"
                        as="script"
                    ></link>

                    <link
                        rel="preload"
                        href="/developer/fonts/EuclidCircularA-Regular-WebXL.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/EuclidCircularA-Medium-WebXL.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/MongoDBValueSerif-Bold.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/MongoDBValueSerif-Medium.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/MongoDBValueSerif-Regular.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/SourceCodePro-Medium.ttf"
                        as="font"
                        type="font/ttf"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/SourceCodePro-Regular.ttf"
                        as="font"
                        type="font/ttf"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/akzidenzgroteskbq_light-webfont.woff2"
                        as="font"
                        type="font/woff2"
                    />
                    <link
                        rel="preload"
                        href="/developer/fonts/akzidenzgroteskbq_medium-webfont.woff2"
                        as="font"
                        type="font/woff2"
                    />
                </Head>
                <body>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                    <Main />
                    <NextScript />
                    <Script
                        id="optimizely-snippet"
                        strategy="beforeInteractive"
                        src="https://cdn.optimizely.com/js/22247140071.js"
                        defer={false}
                        async
                    />
                </body>
            </Html>
        );
    }
}
