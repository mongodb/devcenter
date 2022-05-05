const configVals = {
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    rewrites: [
        {
            source: '/healthz',
            destination: '/api/health',
        },
    ],
};
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(configVals);
} else {
    module.exports = configVals;
}
