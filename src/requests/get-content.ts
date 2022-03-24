import { ContentPiece } from '../interfaces/content-piece';

const getContent = (slug: string): ContentPiece => ({
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
});

export default getContent;
