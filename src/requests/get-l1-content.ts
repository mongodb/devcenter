import { CardContent } from '../interfaces/cardContent';
import { PillCategory } from '../types/pill-category';

const getL1ContentByCategory = (category: PillCategory): CardContent[] => {
    return getL1Content().filter(content => content.pillCategory == category);
};

const getL1Content = (): CardContent[] => {
    return [
        {
            pillCategory: 'DEMO APP',
            thumbnail: {
                size: 'medium',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 1.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'DEMO APP',
            thumbnail: {
                size: 'medium',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 2.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'DEMO APP',
            thumbnail: {
                size: 'medium',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 3.',
            description:
                'Learn how to create a data API with MongoDB Realm in 10 minutes or less.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'VIDEO',
            thumbnail: {
                size: 'large',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 1.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'VIDEO',
            thumbnail: {
                size: 'large',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 2.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'VIDEO',
            thumbnail: {
                size: 'large',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify 3.',
            description:
                "In this post we'll see how to use Github Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'ARTICLE',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 101 article',
            description: 'This is my first article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'ARTICLE',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 102 article',
            description: 'This is my second article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'ARTICLE',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 102 article',
            description: 'This is my third article',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'TUTORIAL',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 101 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'TUTORIAL',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 102 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
        {
            pillCategory: 'TUTORIAL',
            thumbnail: {
                size: 'small',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 103 tutorial',
            description: 'This is my tutorial 101',
            contentDate: new Date().toDateString(),
            tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        },
    ];
};

export default getL1Content;
