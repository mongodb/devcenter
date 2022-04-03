const getSeries = (slug: string) => [
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
];
export default getSeries;
