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

    const posts = await axios.get(
        `${process.env.REALM_SEARCH_URL}/search_devcenter?s=`,
        {
            maxContentLength: 1104857600,
            maxBodyLength: 1104857600,
        }
    );

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
