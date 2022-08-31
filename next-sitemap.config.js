/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://mongodb.com/',
    generateRobotsTxt: true, // (optional)
    // ...other options
};
