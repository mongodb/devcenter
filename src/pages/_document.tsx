import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GTM_ID } from '../utils/gtm';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
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
                        href="https://cdn.optimizely.com/js/15508090763.js"
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
                        href="https://cdn.optimizely.com/js/15508090763.js"
                        as="script"
                    ></link>
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
                        }}
                    />
                    <Main />
                    <NextScript />
                    <Script
                        id="optimizely"
                        strategy="beforeInteractive"
                        src="https://cdn.optimizely.com/js/15508090763.js"
                    />
                </body>
            </Html>
        );
    }
}
