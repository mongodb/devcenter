/*
Currently, using the rewrites configuration in next.config.js does not
work with existing SSG setup. As such, middleware is used to
determine rewrite rules. Once that issue is fixed, this list will 
need to be modified before setting the rewrites attribute in the next.config.js.
*/

const rewrites = [
    {
        source: '/academia',
        destination: '/developer_hub/academia/index.html',
        type: 'internal',
    },
    {
        source: '/academia/educators',
        destination: '/developer_hub/academia/educators/index.html',
        type: 'internal',
    },
    {
        source: '/article/10-tips-making-remote-work-actually-work',
        destination:
            '/developer_hub/article/10-tips-making-remote-work-actually-work/index.html',
        type: 'internal',
    },
    {
        source: '/article/10-ways-raise-your-profile-developer',
        destination:
            '/developer_hub/article/10-ways-raise-your-profile-developer/index.html',
        type: 'internal',
    },
    {
        source: '/article/behind-scenes-mongodb-podcast',
        destination:
            '/developer_hub/article/behind-scenes-mongodb-podcast/index.html',
        type: 'internal',
    },
    {
        source: '/article/introduction-to-modern-databases-mongodb-academia',
        destination:
            '/developer_hub/article/introduction-to-modern-databases-mongodb-academia/index.html',
        type: 'internal',
    },
    {
        source: '/community/art-of-creating-talk',
        destination: '/developer_hub/community/art-of-creating-talk/index.html',
        type: 'internal',
    },
    {
        source: '/community/creating-stunning-slides',
        destination:
            '/developer_hub/community/creating-stunning-slides/index.html',
        type: 'internal',
    },
    {
        source: '/community/surviving-the-stage',
        destination: '/developer_hub/community/surviving-the-stage/index.html',
        type: 'internal',
    },
    {
        source: '/community/virtual-presentation',
        destination: '/developer_hub/community/virtual-presentation/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions',
        destination: '/developer_hub/community-champions/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/arkadiusz-borucki',
        destination:
            '/developer_hub/community-champions/arkadiusz-borucki/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/chris-dellaway',
        destination:
            '/developer_hub/community-champions/chris-dellaway/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/dani-monteiro',
        destination:
            '/developer_hub/community-champions/dani-monteiro/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/hans-peter-grahsl',
        destination:
            '/developer_hub/community-champions/hans-peter-grahsl/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/jai-hirsch',
        destination: '/developer_hub/community-champions/jai-hirsch/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/jay-wooten',
        destination: '/developer_hub/community-champions/jay-wooten/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/leandro-domingues',
        destination:
            '/developer_hub/community-champions/leandro-domingues/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/lina-lora',
        destination: '/developer_hub/community-champions/lina-lora/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/malak-abu%20hammad',
        destination:
            '/developer_hub/community-champions/malak-abu%20hammad/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/michael-h%C3%B6ller',
        destination:
            '/developer_hub/community-champions/michael-h%C3%B6ller/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/nuri-halperin',
        destination:
            '/developer_hub/community-champions/nuri-halperin/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/rajesh-nair',
        destination:
            '/developer_hub/community-champions/rajesh-nair/index.html',
        type: 'internal',
    },
    {
        source: '/community-champions/rodrigo-nascimento',
        destination:
            '/developer_hub/community-champions/rodrigo-nascimento/index.html',
        type: 'internal',
    },
    {
        source: '/:file.js',
        destination: '/developer_hub/:file.js',
        regex: '^/(.+).js$',
        type: 'internal',
    },
    {
        source: '/tag/ios',
        destination: '/developer_hub/tag/ios/index.html',
        type: 'internal',
    },
    {
        source: '/tag/remote-work',
        destination: '/developer_hub/tag/remote-work/index.html',
        type: 'internal',
    },
    {
        source: '/page-data/:data*.json',
        destination: '/developer_hub/page-data/:data*.json',
        regex: '^/page-data/(.+).json$',
        type: 'internal',
    },
    {
        source: '/static/:file.(png|svg|woff|woff2)',
        destination: `${process.env.DEVHUB_URL}/static/:file.png`,
        regex: '/static/(.+).(png|svg|woff|woff2)',
        type: 'external',
    },
    {
        source: '/images/bios/:image.jpg',
        destination: `${process.env.DEVHUB_URL}/images/bios/:image.jpg`,
        regex: '/images/bios/(.+).jpg',
        type: 'external',
    },
    {
        source: '/images/atf-images/:image*.png',
        destination: `${process.env.DEVHUB_URL}/images/atf-images/:image*.png`,
        regex: '/images/atf-images/(.+).png',
        type: 'external',
    },
];

module.exports = {
    rewrites: rewrites,
};
