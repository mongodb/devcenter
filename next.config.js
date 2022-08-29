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

const configVals = {
    basePath: basePath,
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    compiler: {
        styledComponents: true,
        emotion: true,
    },
    async headers() {
        return [
            {
                source: '/_next/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, immutable',
                    },
                ],
            },
            {
                source: '/(.*)', // all pages
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, max-age=0, must-revalidate',
                    },
                    {
                        key: 'Pragma',
                        value: 'public',
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
    const enableSentry =
        process.env.APP_ENV === 'dev' ||
        process.env.APP_ENV === 'staging' ||
        process.env.APP_ENV === 'production';
    module.exports = withNextPluginPreval(
        enableSentry
            ? withSentryConfig(configVals, sentryWebpackPluginOptions)
            : configVals
    );
}
