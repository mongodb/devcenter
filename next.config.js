const { redirects, rewrites } = require('./config/redirects');

const configVals = {
    basePath: '/developer',
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    // #TODO: Fix issue with router.js refetching
    redirects: redirects,
    rewrites: rewrites,
};
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(configVals);
} else {
    module.exports = configVals;
}
