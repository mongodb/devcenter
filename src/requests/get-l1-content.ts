import { ContentPiece } from '../interfaces/content-piece';

interface L1Content {
    content: ContentPiece[];
    featured: ContentPiece[];
}
const getL1Content = (slug: string = 'all'): L1Content => {
    const featured: ContentPiece[] = [
        {
            authors: ['Farah Appleseed'],
            category: 'Video',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 1.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/v1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 101 article',
            description: 'This is my first article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/a1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Tutorial',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 102 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/t1',
        },
    ];
    const content: ContentPiece[] = [
        {
            authors: ['Farah Appleseed'],
            category: 'Demo App',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 1.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/d1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Demo App',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 2.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/d2',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Demo App',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 3.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/d3',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Video',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 1.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/v1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Video',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 2.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/v2',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Video',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 3.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/v3',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article',
            title: 'This is 101 article',
            description: 'This is my first article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/a1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 102 article',
            description: 'This is my second article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a2',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 103 article',
            description: 'This is my third article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a3',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Article',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 104 article',
            description: 'This is my fourth article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/a4',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Tutorial',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 102 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: true,
            slug: 'product/atlas/t1',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Tutorial',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 101 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/t2',
        },
        {
            authors: ['Farah Appleseed'],
            category: 'Tutorial',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 103 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/t3',
        },
        {
            category: 'Podcast',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 23',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/p1',
        },
        {
            category: 'Podcast',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 96',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/p2',
        },
        {
            category: 'Podcast',
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 2',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
            featured: false,
            slug: 'product/atlas/p3',
        },
    ];
    const returnContent =
        slug === 'atlas'
            ? content
            : slug === 'data-lake'
            ? content.slice(0, 10)
            : slug === 'vs-code'
            ? content.slice(0, 5)
            : slug === 'all'
            ? content
            : [];
    return { content: returnContent, featured };
};

export default getL1Content;
