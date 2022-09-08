const Feed = require('feed').Feed;
const axios = require('axios').default;
const fs = require('fs');

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

    const url = `${process.env.REALM_SEARCH_URL}/search_devcenter_dev?s=`;

    // Bringing back axios here since axios.post does not
    // appear to have issue referenced in https://github.com/axios/axios/issues/4806.
    const posts = await axios.post(url, {});

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
