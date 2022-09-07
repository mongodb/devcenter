/*
Currently, using the rewrites configuration in next.config.js does not
work with existing SSG setup. As such, middleware is used to
determine rewrite rules. Once that issue is fixed, this list will 
need to be modified before setting the rewrites attribute in the next.config.js.
*/

const rewrites = [
    {
        source: '/article/10-tips-making-remote-work-actually-work/',
        destination: `${process.env.DEVHUB_URL}/article/10-tips-making-remote-work-actually-work/`,
    },
    {
        source: '/article/10-ways-raise-your-profile-developer/',
        destination: `${process.env.DEVHUB_URL}/article/10-ways-raise-your-profile-developer/`,
    },
    {
        source: '/article/behind-scenes-mongodb-podcast/',
        destination: `${process.env.DEVHUB_URL}/article/behind-scenes-mongodb-podcast/`,
    },
    {
        source: '/article/introduction-to-modern-databases-mongodb-academia/',
        destination: `${process.env.DEVHUB_URL}/article/introduction-to-modern-databases-mongodb-academia/`,
    },
    {
        source: '/community/creating-stunning-slides/',
        destination: `${process.env.DEVHUB_URL}/community/creating-stunning-slides/`,
    },
    {
        source: '/community/speaker-program/',
        destination: `${process.env.DEVHUB_URL}/community/speaker-program/`,
    },
    {
        source: '/community/art-of-creating-talk/',
        destination: `${process.env.DEVHUB_URL}/community/art-of-creating-talk/`,
    },
    {
        source: '/community/surviving-the-stage/',
        destination: `${process.env.DEVHUB_URL}/community/surviving-the-stage/`,
    },
    {
        source: '/community/virtual-presentation/',
        destination: `${process.env.DEVHUB_URL}/community/virtual-presentation/`,
    },
    {
        source: '/community-champions/',
        destination: `${process.env.DEVHUB_URL}/community-champions/`,
    },
    {
        source: '/community-champions/arkadiusz-borucki/',
        destination: `${process.env.DEVHUB_URL}/community-champions/arkadiusz-borucki/`,
    },
    {
        source: '/community-champions/chris-dellaway/',
        destination: `${process.env.DEVHUB_URL}/community-champions/chris-dellaway/`,
    },
    {
        source: '/community-champions/dani-monteiro/',
        destination: `${process.env.DEVHUB_URL}/community-champions/dani-monteiro/`,
    },
    {
        source: '/community-champions/hans-peter-grahsl/',
        destination: `${process.env.DEVHUB_URL}/community-champions/hans-peter-grahsl/`,
    },
    {
        source: '/community-champions/jai-hirsch/',
        destination: `${process.env.DEVHUB_URL}/community-champions/jai-hirsch/`,
    },
    {
        source: '/community-champions/jay-wooten/',
        destination: `${process.env.DEVHUB_URL}/community-champions/jay-wooten/`,
    },
    {
        source: '/community-champions/leandro-domingues/',
        destination: `${process.env.DEVHUB_URL}/community-champions/leandro-domingues/`,
    },
    {
        source: '/community-champions/lina-lora/',
        destination: `${process.env.DEVHUB_URL}/community-champions/lina-lora/`,
    },
    {
        source: '/community-champions/malak-abu%20hammad/',
        destination: `${process.env.DEVHUB_URL}/community-champions/malak-abu%20hammad/`,
    },
    {
        source: '/community-champions/michael-h%C3%B6ller/',
        destination: `${process.env.DEVHUB_URL}/community-champions/michael-h%C3%B6ller/`,
    },
    {
        source: '/community-champions/nuri-halperin/',
        destination: `${process.env.DEVHUB_URL}/community-champions/nuri-halperin/`,
    },
    {
        source: '/community-champions/rajesh-nair/',
        destination: `${process.env.DEVHUB_URL}/community-champions/rajesh-nair/`,
    },
    {
        source: '/community-champions/rodrigo-nascimento/',
        destination: `${process.env.DEVHUB_URL}/community-champions/rodrigo-nascimento/`,
    },
    {
        source: '/tag/remote-work/',
        destination: `${process.env.DEVHUB_URL}/tag/remote-work/`,
    },
    {
        source: '/:file.js',
        destination: `${process.env.DEVHUB_URL}/:file.js`,
        regex: '^/(.+)\\.js$',
    },
    {
        source: '/page-data/:data*.json',
        destination: `${process.env.DEVHUB_URL}/page-data/:data*.json`,
        regex: '^/page-data/(.+)\\.json$',
    },
    {
        source: '/static/:file.(png|svg|woff|woff2)',
        destination: `${process.env.DEVHUB_URL}/static/:file.png`,
        regex: '^/static/(.+)\\.(png|svg|woff|woff2)$',
    },
    {
        source: '/images/bios/:image.jpg',
        destination: `${process.env.DEVHUB_URL}/images/bios/:image.jpg`,
        regex: '^/images/bios/(.+)\\.jpg$',
    },
    {
        source: '/images/community/:image.jpg',
        destination: `${process.env.DEVHUB_URL}/images/community/:image.jpg`,
        regex: '^/images/community/(.+)\\.jpg$',
    },
    {
        source: '/static/:image.jpg',
        destination: `${process.env.DEVHUB_URL}/static/:image.jpg`,
        regex: '^/static/(.+)\\.jpg$',
    },
    {
        source: '/images/atf-images/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/atf-images/:image*.png`,
        regex: '^/images/atf-images/(.+)\\.png$',
    },
    {
        source: '/images/how-to/:image*.(png|jpg|jpeg|gif)',
        destination: `${process.env.DEVHUB_URL}/images/how-to/:image*.(png|jpg|jpeg|gif)`,
        regex: '^/images/how-to/(.+)\\.(png|jpg|jpeg|gif)$',
    },
    {
        source: '/images/article/:image*.(png|jpg|jpeg|gif)',
        destination: `${process.env.DEVHUB_URL}/images/article/:image*.(png|jpg|jpeg|gif)`,
        regex: '^/images/article/(.+)\\.(png|jpg|jpeg|gif)$',
    },
    {
        source: '/images/qs-badges/:image*.(png|jpg|jpeg|gif)',
        destination: `${process.env.DEVHUB_URL}/images/qs-badges/:image*.(png|jpg|jpeg|gif)`,
        regex: '^/images/qs-badges/(.+)\\.(png|jpg|jpeg|gif)$',
    },
    {
        source: '/images/starlette/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/starlette/:image*.png`,
        regex: '^/images/starlette/(.+)\\.png$',
    },
    {
        source: '/images/heroku/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/heroku/:image*.png`,
        regex: '^/images/heroku/(.+)\\.png$',
    },
    {
        source: '/images/aws-lambda/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/aws-lambda/:image*.png`,
        regex: '^/images/aws-lambda/(.+)\\.png$',
    },
    {
        source: '/images/aws-cloudformation/:image*.(gif|png)',
        destination: `${process.env.DEVHUB_URL}/images/aws-cloudformation/:image*.(gif|png)`,
        regex: '^/images/aws-cloudformation/(.+)\\.(gif|png)$',
    },
    {
        source: '/images/atlas-fts/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/atlas-fts/:image*.png`,
        regex: '^/images/atlas-fts/(.+)\\.png$',
    },
    {
        source: '/images/charts-sdk/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/charts-sdk/:image*.png`,
        regex: '^/images/charts-sdk/(.+)\\.png$',
    },
    {
        source: '/images/:image*.(png|jpg|jpeg|gif)',
        destination: `${process.env.DEVHUB_URL}/images/:image*.(png|jpg|jpeg|gif)`,
        regex: '^/images/(.+)\\.(png|jpg|jpeg|gif)$',
    },
];

module.exports = {
    rewrites: rewrites,
};
