/* eslint-disable @typescript-eslint/no-var-requires */
const Feed = require('feed').Feed;
const fs = require('fs');
const http = require('http');

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

    // We don't use axios here due to a bug in axios where
    // it cannot always handle responses with long content lengths.
    // Issue referenced in https://github.com/axios/axios/issues/4806.
    http.request(
        `${process.env.BACKEND_URL}/api/search`,
        { method: 'POST' },
        response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                const parsedData = JSON.parse(data);
                parsedData.forEach(post => {
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
                console.log('Built RSS feed.');
            });
        }
    )
        .on('error', err => {
            console.error(err);
        })
        .end();
}

module.exports = {
    buildRssFeed,
};
