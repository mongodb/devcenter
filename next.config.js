const { redirects } = require('./config/redirects');

const siteURL = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.SITE_URL;
const httpProtocol = siteURL == 'localhost:3000' ? 'http' : 'https';

const configVals = {
    basePath: '/developer',
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    redirects: redirects,
    publicRuntimeConfig: {
        absoluteBasePath: `${httpProtocol}://${siteURL}`,
    },
};
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(configVals);
} else {
    module.exports = configVals;
}
