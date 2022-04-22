import { ContentPiece } from '../interfaces/content-piece';

const getRelatedContent = (slug: string): ContentPiece[] => [
    // {
    //     category: 'Podcast',
    //     image: {
    //         alt: 'thumbnail',
    //         url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
    //     },
    //     title: 'MongoDB Podcast: Episode 23',
    //     description: 'Some podcast details',
    //     contentDate: new Date().toDateString(),
    //     tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
    //     featured: false,
    //     slug: 'product/atlas/p1',
    // },
    // {
    //     category: 'Podcast',
    //     image: {
    //         alt: 'thumbnail',
    //         url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
    //     },
    //     title: 'MongoDB Podcast: Episode 96',
    //     description: 'Some podcast details',
    //     contentDate: new Date().toDateString(),
    //     tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
    //     featured: false,
    //     slug: 'product/atlas/p2',
    // },
    // {
    //     category: 'Podcast',
    //     image: {
    //         alt: 'thumbnail',
    //         url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
    //     },
    //     title: 'MongoDB Podcast: Episode 2',
    //     description: 'Some podcast details',
    //     contentDate: new Date().toDateString(),
    //     tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
    //     featured: false,
    //     slug: 'product/atlas/p3',
    // },
];
export default getRelatedContent;
