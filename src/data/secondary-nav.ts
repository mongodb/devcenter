export const secondaryNavData = [
    {
        name: 'Topics',
        slug: '',
        dropDownItems: [
            {
                name: 'Products',
                slug: '',
                all: 'All Products',
                path: '/products',
                dropDownItems: [
                    {
                        name: 'Atlas',
                        slug: '/products/atlas',
                        dropDownItems: [
                            {
                                name: 'Online Archive',
                                slug: '/products/atlas/online-archive',
                            },
                            {
                                name: 'Data Lake',
                                slug: '/products/atlas/data-lake',
                            },
                            {
                                name: 'Full Text Search',
                                slug: '/products/atlas/full-text-search',
                            },
                            {
                                name: 'Charts',
                                slug: '/products/atlas/charts',
                            },
                            {
                                name: 'Data API',
                                slug: '/products/atlas/data-api',
                            },
                            {
                                name: 'Multi-Cloud',
                                slug: '/products/atlas/multi-cloud',
                            },
                        ],
                    },
                    {
                        name: 'Compass',
                        slug: '/products/compass',
                        dropDownItems: [],
                    },
                    {
                        name: 'Realm (Mobile)',
                        slug: '/products/realm',
                        dropDownItems: [
                            {
                                name: 'SDK',
                                slug: '/products/realm/sdk',
                            },
                            {
                                name: 'Sync',
                                slug: '/products/realm/sync',
                            },
                            {
                                name: 'Studio',
                                slug: '/products/realm/studio',
                            },
                        ],
                    },
                    {
                        name: 'Connectors',
                        slug: '/products/connectors',
                        dropDownItems: [],
                    },
                ],
            },
            {
                name: 'Languages',
                slug: '',
                all: 'All Languages',
                path: '/languages',
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
                path: '/technologies',
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
                path: '/topics',
                dropDownItems: [
                    {
                        name: 'Introductory',
                        slug: 'expertise-levels/introductory',
                    },
                    { name: 'Advanced', slug: '/expertise-levels/advanced' },
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
