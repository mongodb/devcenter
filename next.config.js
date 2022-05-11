const { redirects, rewrites } = require('./config/redirects');

const configVals = {
    basePath: '/developer',
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    redirects: redirects,
    rewrites: {
        fallback: rewrites,
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
