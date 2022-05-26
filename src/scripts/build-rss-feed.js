const Feed = require('feed').Feed;
const fs = require('fs');
const axios = require('axios').default;

async function buildRssFeed(baseUrl) {
    const date = new Date();

    const feed = new Feed({
        title: 'MongoDB Developer Center',
        description: 'MongoDB Developer Center RSS Feed',
        id: baseUrl,
        link: baseUrl,
        language: 'en',
        updated: date,
        generator: 'Next.js using Feed for Node.js',
        feedLinks: {
            rss2: `${baseUrl}/rss.xml`,
        },
    });

    const searchEndpoint =
        'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter?s=';
    const posts = await axios.get(searchEndpoint);

    posts.data.forEach(post => {
        const url = `${baseUrl}${post.slug}`;
        feed.addItem({
            title: post.name,
            id: url,
            link: url,
            description: post.description,
            date: new Date(post.date),
        });
    });

    fs.writeFileSync('public/rss.xml', feed.rss2());
}

module.exports = {
    buildRssFeed,
};