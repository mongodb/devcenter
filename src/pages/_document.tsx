import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const gaScriptArgs =
    process.env['APP_ENV'] === 'production' ? '' : '!0,{debugMode:!0}';

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
                        href="https://cdn.optimizely.com/js/22247140071.js"
                    />
                    <link
                        rel="dns-prefetch preconnect"
                        href="https://logx.optimizely.com"
                    />
                    <link
                        rel="preload"
                        href="https://cdn.optimizely.com/js/22247140071.js"
                        as="script"
                    />
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
                    <Script
                        id="ga-base"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(e,n){var t=document.createElement("script"),o=null,x="pathway";t.async=!0,t.src='https://'+x+'.mongodb.com/'+(e?x+'-debug.js':''),
                                document.head.append(t),t.addEventListener("load",function(){o=window.pathway.default,(n&&o.configure(n)),o.createProfile("mongodbcom").load(),
                                window.segment=o})}(${gaScriptArgs});
                            `,
                        }}
                        async
                    />
                </Head>
                <body>
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
