/*
Currently, using the rewrites configuration in next.config.js does not
work with existing SSG setup. As such, middleware is used to
determine rewrite rules. Once that issue is fixed, this list will 
need to be modified before setting the rewrites attribute in the next.config.js.
*/

const rewrites = [
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
];

module.exports = {
    rewrites: rewrites,
};
