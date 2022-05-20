/*
Currently, using the rewrites configuration in next.config.js does not
work with existing SSG setup. As such, middleware is used to
determine rewrite rules. Once that issue is fixed, this list will 
need to be modified before setting the rewrites attribute in the next.config.js.
*/

const rewrites = [
    {
        source: '/academia',
        destination: `${process.env.DEVHUB_URL}/academia/`,
    },
    {
        source: '/academia/educators',
        destination: `${process.env.DEVHUB_URL}/academia/educators/`,
    },
    {
        source: '/article/10-tips-making-remote-work-actually-work',
        destination: `${process.env.DEVHUB_URL}/article/10-tips-making-remote-work-actually-work/`,
    },
    {
        source: '/article/10-ways-raise-your-profile-developer',
        destination: `${process.env.DEVHUB_URL}/article/10-ways-raise-your-profile-developer/`,
    },
    {
        source: '/article/behind-scenes-mongodb-podcast',
        destination: `${process.env.DEVHUB_URL}/article/behind-scenes-mongodb-podcast/`,
    },
    {
        source: '/article/introduction-to-modern-databases-mongodb-academia',
        destination: `${process.env.DEVHUB_URL}/article/introduction-to-modern-databases-mongodb-academia/`,
    },
    {
        source: '/community/art-of-creating-talk',
        destination: `${process.env.DEVHUB_URL}/community/art-of-creating-talk/`,
    },
    {
        source: '/community/creating-stunning-slides',
        destination: `${process.env.DEVHUB_URL}/community/creating-stunning-slides/`,
    },
    {
        source: '/community/surviving-the-stage',
        destination: `${process.env.DEVHUB_URL}/community/surviving-the-stage/`,
    },
    {
        source: '/community/virtual-presentation',
        destination: `${process.env.DEVHUB_URL}/community/virtual-presentation/`,
    },
    {
        source: '/community-champions',
        destination: `${process.env.DEVHUB_URL}/community-champions/`,
    },
    {
        source: '/community-champions/arkadiusz-borucki',
        destination: `${process.env.DEVHUB_URL}/community-champions/arkadiusz-borucki/`,
    },
    {
        source: '/community-champions/chris-dellaway',
        destination: `${process.env.DEVHUB_URL}/community-champions/chris-dellaway/`,
    },
    {
        source: '/community-champions/dani-monteiro',
        destination: `${process.env.DEVHUB_URL}/community-champions/dani-monteiro/`,
    },
    {
        source: '/community-champions/hans-peter-grahsl',
        destination: `${process.env.DEVHUB_URL}/community-champions/hans-peter-grahsl/`,
    },
    {
        source: '/community-champions/jai-hirsch',
        destination: `${process.env.DEVHUB_URL}/community-champions/jai-hirsch/`,
    },
    {
        source: '/community-champions/jay-wooten',
        destination: `${process.env.DEVHUB_URL}/community-champions/jay-wooten/`,
    },
    {
        source: '/community-champions/leandro-domingues',
        destination: `${process.env.DEVHUB_URL}/community-champions/leandro-domingues/`,
    },
    {
        source: '/community-champions/lina-lora',
        destination: `${process.env.DEVHUB_URL}/community-champions/lina-lora/`,
    },
    {
        source: '/community-champions/malak-abu%20hammad',
        destination: `${process.env.DEVHUB_URL}/community-champions/malak-abu%20hammad/`,
    },
    {
        source: '/community-champions/michael-h%C3%B6ller',
        destination: `${process.env.DEVHUB_URL}/community-champions/michael-h%C3%B6ller/`,
    },
    {
        source: '/community-champions/nuri-halperin',
        destination: `${process.env.DEVHUB_URL}/community-champions/nuri-halperin/`,
    },
    {
        source: '/community-champions/rajesh-nair',
        destination: `${process.env.DEVHUB_URL}/community-champions/rajesh-nair/`,
    },
    {
        source: '/community-champions/rodrigo-nascimento',
        destination: `${process.env.DEVHUB_URL}/community-champions/rodrigo-nascimento/`,
    },
    {
        source: '/tag/ios',
        destination: `${process.env.DEVHUB_URL}/tag/ios/`,
    },
    {
        source: '/tag/remote-work',
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
        source: '/images/atf-images/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/atf-images/:image*.png`,
        regex: '^/images/atf-images/(.+)\\.png$',
    },
];

module.exports = {
    rewrites: rewrites,
};
