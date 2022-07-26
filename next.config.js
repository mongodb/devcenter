const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();
const { withSentryConfig } = require('@sentry/nextjs');

const { redirects } = require('./config/redirects');
const pageDescriptions = require('./config/seo/descriptions.json');
const { buildRssFeed } = require('./src/scripts/build-rss-feed.js');

const hostUrl = process.env.HOST_URL;
const httpProtocol = hostUrl == 'localhost:3000' ? 'http' : 'https';
const basePath = '/developer';

const configVals = {
    basePath: basePath,
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    compiler: {
        styledComponents: true,
    },
    experimental: {
        emotion: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)', // all pages
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'max-age=3600',
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
        ];
    },
    redirects: redirects,
    publicRuntimeConfig: {
        absoluteBasePath: `${httpProtocol}://${hostUrl}${basePath}`,
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

    console.log('process.env.APP_ENV', process.env.APP_ENV);
    console.log('enableSentry', enableSentry);

    module.exports = withNextPluginPreval(
        enableSentry
            ? withSentryConfig(configVals, sentryWebpackPluginOptions)
            : configVals
    );
}
