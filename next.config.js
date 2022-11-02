const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();
const { withSentryConfig } = require('@sentry/nextjs');

const { redirects } = require('./config/redirects');
const pageDescriptions = require('./config/seo/descriptions.json');
const { buildRssFeed } = require('./src/scripts/build-rss-feed.js');

const hostUrl = process.env.HOST_URL;
const httpProtocol = [
    'localhost:3000',
    'devcenter-local.mongodb.com:3000',
].includes(hostUrl)
    ? 'http'
    : 'https';
const basePath = '/developer';

const accountPortalUrl = `${process.env.ACCOUNT_PORTAL_URL}/account/login`;

const buildImagePatterns = (hostsString = '') => {
    const items = hostsString.split(';');

    if (items.length === 0) {
        return [];
    }

    return items.reduce((acc, item) => {
        const match =
            /^(https?):\/\/([a-zA-Z0-9\*\.\-]+)((?:\/[a-zA-Z0-9\*\-]+)+)?/.exec(
                item.trim()
            );

        if (match && match[2]) {
            return [
                ...acc,
                {
                    protocol: match[1],
                    hostname: match[2],
                    ...(match[3] ? { pathname: match[3] } : {}),
                },
            ];
        } else {
            return acc;
        }
    }, []);
};

/*
    Set the NEXT_IMAGE_HOSTS env variable to a semicolon-delimited list of hosts to add extra image hosts
    e.g. export NEXT_IMAGE_HOSTS="https://google.com/;http://**.test.com/test?abc=123" will generate the entries
    [{ 'protocol': 'https', 'hostname': 'google.com' }, { 'protocol': 'http', 'hostname': '**.test.com', 'pathname': '/test' }]
*/
const IMAGE_PATTERNS = buildImagePatterns(process.env.NEXT_IMAGE_HOSTS);

const configVals = {
    basePath: basePath,
    reactStrictMode: true,
    images: {
        minimumCacheTTL: 86400,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.mongodb.com', // webimages.mongodb.com, www.mongodb.com, etc.
            },
            {
                protocol: 'https',
                hostname: 'mongodb-devhub-cms.s3.us-west-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com', // YouTube thumbnails
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            ...IMAGE_PATTERNS,
        ],
        path: `${basePath}/_next/image`,
    },
    compiler: {
        styledComponents: true,
        emotion: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)', // all pages
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, must-revalidate, proxy-revalidate, max-age=3600',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
            {
                source: '/(.*).(jpg|jpeg|png|gif|svg|ico|woff2|ttf)', // all images and fonts
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
            {
                //https://github.com/nextauthjs/next-auth/issues/2408
                source: '/api/auth/:slug',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
            },
        ];
    },
    redirects: redirects,
    publicRuntimeConfig: {
        absoluteBasePath: `${httpProtocol}://${hostUrl}${basePath}`,
        accountPortalUrl: accountPortalUrl,
        pageDescriptions: pageDescriptions, //TODO: Move to CMS
    },
    staticPageGenerationTimeout: 180,
    trailingSlash: true,
    webpack: (config, { isServer, dev }) => {
        if (isServer && !dev) {
            buildRssFeed(`${httpProtocol}://${hostUrl}${basePath}`).then(() =>
                console.log('Built RSS feed.')
            );
        }

        return config;
    },
    swcMinify: true,
};

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withNextPluginPreval(withBundleAnalyzer(configVals));
} else {
    // Temporarily disable this.
    // const enableSentry =
    //     process.env.APP_ENV === 'dev' ||
    //     process.env.APP_ENV === 'staging' ||
    //     process.env.APP_ENV === 'production';
    const enableSentry = false;
    module.exports = withNextPluginPreval(
        enableSentry
            ? withSentryConfig(configVals, sentryWebpackPluginOptions)
            : configVals
    );
}
