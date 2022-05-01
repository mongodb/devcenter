const secondaryNavData = [
    {
        text: 'All Courses',
        path: '/articles',
    },
    {
        text: 'Certification',
        path: '/tutorials',
        dropdownItems: [
            { text: 'About Certification', path: '/tutorials/' },
            { text: 'Developer Exam', path: '/tutorials/' },
            { text: 'DBA Exam', path: '/tutorials/' },
            { text: 'Exam Prep', path: '/tutorials/' },
            { text: 'Find a Certified Professional', path: '/tutorials/' },
            { text: 'Verify a Certified Professional', path: '/tutorials/' },
        ],
    },
];

export const myData = [
    {
        name: 'Topics',
        slug: '/',
        dropDownItems: [
            {
                name: 'Products',
                slug: '',
                all: 'All Topics',
                path: '/all-topics',
                dropDownItems: [
                    {
                        name: 'MongoDB',
                        slug: '/product/mongodb',
                        dropDownItems: [
                            {
                                name: 'Full Text Search',
                                slug: '/product/mongodb/full-text-search',
                            },
                            {
                                name: 'Sharding',
                                slug: '/product/mongodb/sharding',
                            },
                        ],
                    },
                    {
                        name: 'Realm (Mobile)',
                        slug: '/product/realm-(mobile)',
                        dropDownItems: [
                            {
                                name: 'Sync',
                                slug: '/product/realm-(mobile)/sync',
                            },
                        ],
                    },
                    {
                        name: 'Atlas',
                        slug: '/product/atlas',
                        dropDownItems: [
                            {
                                name: 'Aggregations',
                                slug: '/product/atlas/aggregations',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Languages',
                slug: '',
                all: 'All Topics',
                path: '/all-topics',
                dropDownItems: [
                    { name: 'Go', slug: '/language/go' },
                    { name: 'Java', slug: '/language/java' },
                    { name: 'CSharp', slug: '/language/csharp' },
                    { name: 'C', slug: '/language/c' },
                ],
            },
            {
                name: 'Technologies',
                slug: '',
                all: 'All Topics',
                path: '/all-topics',
                dropDownItems: [
                    { name: 'GCP', slug: '/technology/gcp' },
                    { name: 'BI', slug: '/technology/bi' },
                    { name: 'AWS', slug: '/technology/aws' },
                ],
            },
            {
                name: 'Expertise Levels',
                slug: '',
                all: 'All Topics',
                path: '/all-topics',
                dropDownItems: [
                    {
                        name: 'Introductory',
                        slug: '/expertise-level/introductory',
                    },
                    { name: 'Expert', slug: '/expertise-level/expert' },
                ],
            },
        ],
    },
    { name: 'Documentation', slug: 'https://www.mongodb.com/docs/' },
    { name: 'Articles', slug: '/articles' },
    { name: 'Tutorials', slug: '/tutorials' },
    { name: 'Quickstarts', slug: '/quickstart' },
    { name: 'Code Examples', slug: '/codeexamples' },
    {
        name: 'Podcasts',
        slug: 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624',
    },
    { name: 'Videos', slug: '/videos' },
];

export default secondaryNavData;
