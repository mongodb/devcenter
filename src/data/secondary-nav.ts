export const secondaryNavData = [
    {
        name: 'Topics',
        slug: '',
        dropDownItems: [
            {
                name: 'Languages',
                slug: '',
                all: 'All Languages',
                path: '/languages',
                dropDownItems: [
                    { name: 'JavaScript', slug: '/languages/javascript' },
                    { name: 'C#', slug: '/languages/csharp' },
                    { name: 'Python', slug: '/languages/python' },
                    { name: 'Kotlin', slug: '/languages/kotlin' },
                    { name: 'Java', slug: '/languages/java' },
                    { name: 'PHP', slug: '/languages/php' },
                    { name: 'Swift', slug: '/languages/swift' },
                ],
            },
            {
                name: 'Technologies',
                slug: '',
                all: 'All Technologies',
                path: '/technologies',
                dropDownItems: [
                    { name: 'Docker', slug: '/technologies/docker' },
                    { name: 'Azure', slug: '/technologies/azure' },
                    { name: 'AWS', slug: '/technologies/aws' },
                    { name: 'Kubernetes', slug: '/technologies/kubernetes' },
                    { name: 'Nextjs', slug: '/technologies/nextjs' },
                    { name: 'Nodejs', slug: '/technologies/nodejs' },
                    { name: 'Unity', slug: '/technologies/unity' },
                    { name: 'GCP', slug: '/technologies/gcp' },
                ],
            },
            {
                name: 'Products',
                slug: '',
                all: 'All Products',
                path: '/products',
                dropDownItems: [
                    {
                        name: 'Atlas',
                        slug: '/products/atlas',
                        dropDownItems: [],
                    },
                    {
                        name: 'Atlas Search',
                        slug: '/products/atlas/full-text-search',
                        dropDownItems: [],
                    },
                    {
                        name: 'Compass',
                        slug: '/products/compass',
                        dropDownItems: [],
                    },
                    {
                        name: 'Aggregation',
                        slug: '/products/mongodb/aggregation-framework',
                        dropDownItems: [],
                    },
                    {
                        name: 'MongoDB',
                        slug: '/products/mongodb',
                        dropDownItems: [],
                    },
                    {
                        name: 'Encryption',
                        slug: '/products/mongodb/security',
                        dropDownItems: [],
                    },
                    {
                        name: 'Realm',
                        slug: '/products/realm',
                        dropDownItems: [],
                    },
                    {
                        name: 'Connectors',
                        slug: '/products/connectors',
                        dropDownItems: [],
                    },
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
