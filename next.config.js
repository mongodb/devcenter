const configVals = {
    basePath: '/developer',
    reactStrictMode: true,
    images: {
        domains: ['mongodb-devhub-cms.s3.us-west-1.amazonaws.com'],
    },
    rewrites: async () => {
        return [
            {
                source: '/community-champions',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/`,
            },
            {
                source: '/community-champions/arkadiusz-borucki',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/arkadiusz-borucki/`,
            },
            {
                source: '/community-champions/chris-dellaway',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/chris-dellaway/`,
            },
            {
                source: '/community-champions/dani-monteiro',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/dani-monteiro/`,
            },
            {
                source: '/community-champions/hans-peter-grahsl',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/hans-peter-grahsl/`,
            },
            {
                source: '/community-champions/jai-hirsch',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/jai-hirsch/`,
            },
            {
                source: '/community-champions/jay-wooten',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/jay-wooten/`,
            },
            {
                source: '/community-champions/leandro-domingues',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/leandro-domingues/`,
            },
            {
                source: '/community-champions/lina-lora',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/lina-lora/`,
            },
            {
                source: '/community-champions/malak-abu%20hammad',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/malak-abu%20hammad/`,
            },
            {
                source: '/community-champions/michael-h%C3%B6ller',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/michael-h%C3%B6ller/`,
            },
            {
                source: '/community-champions/nuri-halperin',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/nuri-halperin/`,
            },
            {
                source: '/community-champions/rajesh-nair',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/rajesh-nair/`,
            },
            {
                source: '/community-champions/rodrigo-nascimento',
                destination: `${process.env.OLD_DEVHUB_URL}/community-champions/rodrigo-nascimento/`,
            },
        ];
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
