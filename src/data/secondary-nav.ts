export const secondaryNavData = [
    {
        name: 'Topics',
        slug: '/',
        dropDownItems: [
            {
                name: 'Products',
                slug: '',
                all: 'All Products',
                path: '/all-topics',
                dropDownItems: [
                    {
                        name: 'MongoDB',
                        l1Product: true,
                        slug: '/products/mongodb',
                        dropDownItems: [
                            {
                                name: 'Full Text Search',
                                slug: '/products/mongodb/full-text-search',
                            },
                            {
                                name: 'Sharding',
                                slug: '/products/mongodb/sharding',
                            },
                            {
                                name: 'All MongoDB Products',
                                slug: '/products/mongodb',
                            },
                        ],
                    },
                    {
                        name: 'Realm (Mobile)',
                        l1Product: true,
                        slug: '/products/realm',
                        dropDownItems: [
                            {
                                name: 'Sync',
                                slug: '/products/realm/sync',
                            },
                            {
                                name: 'All Realm Products',
                                slug: '/products/realm',
                            },
                        ],
                    },
                    {
                        name: 'Atlas',
                        l1Product: true,
                        slug: '/products/atlas',
                        dropDownItems: [
                            {
                                name: 'Aggregations',
                                slug: '/products/atlas/aggregations',
                            },
                            {
                                name: 'All Atlas Products',
                                slug: '/products/atlas',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Languages',
                slug: '',
                all: 'All Languages',
                path: '/all-topics',
                dropDownItems: [
                    { name: 'Go', slug: '/languages/go' },
                    { name: 'Java', slug: '/languages/java' },
                    { name: 'CSharp', slug: '/languages/csharp' },
                    { name: 'C', slug: '/languages/c' },
                ],
            },
            {
                name: 'Technologies',
                slug: '',
                all: 'All Technologies',
                path: '/all-topics',
                dropDownItems: [
                    { name: 'GCP', slug: '/technologies/gcp' },
                    { name: 'BI', slug: '/technologies/bi' },
                    { name: 'AWS', slug: '/technologies/aws' },
                ],
            },
            {
                name: 'Expertise Levels',
                slug: '',
                all: '',
                path: '/all-topics',
                dropDownItems: [
                    {
                        name: 'Introductory',
                        slug: '/expertise-levels/introductory',
                    },
                    { name: 'Expert', slug: '/expertise-levels/expert' },
                ],
            },
        ],
    },
    { name: 'Documentation', slug: 'https://www.mongodb.com/docs/' },
    { name: 'Articles', slug: '/articles' },
    { name: 'Tutorials', slug: '/tutorials' },
    { name: 'Quickstarts', slug: '/quickstarts' },
    { name: 'Code Examples', slug: '/code-examples' },
    {
        name: 'Podcasts',
        slug: 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624',
    },
    { name: 'Videos', slug: '/videos' },
];

export default secondaryNavData;
