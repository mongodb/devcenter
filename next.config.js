const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();
const { redirects } = require('./config/redirects');
const pageDescriptions = require('./config/seo/descriptions.json');
const { buildRssFeed } = require('./src/scripts/build-rss-feed.js');

const hostUrl = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.HOST_URL;
const httpProtocol = hostUrl == 'localhost:3000' ? 'http' : 'https';
const basePath = '/developer';

const configVals = {
    basePath: basePath,
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
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
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withNextPluginPreval(withBundleAnalyzer(configVals));
} else {
    module.exports = withNextPluginPreval(configVals);
}
