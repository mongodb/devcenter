const { redirects } = require('./config/redirects');

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
    redirects: redirects,
    publicRuntimeConfig: {
        absoluteBasePath: `${httpProtocol}://${hostUrl}${basePath}`,
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
