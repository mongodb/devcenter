const { redirects } = require('./config/redirects');
const pageDescriptions = require('./config/seo/descriptions.json');

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
    headers: async () => {
        return [
            {
                source: '/:path*', // all pages
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
};
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(configVals);
} else {
    module.exports = configVals;
}
