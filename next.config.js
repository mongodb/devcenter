const configVals = {
    reactStrictMode: true,
};
if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(configVals);
} else {
    module.exports = configVals;
}
