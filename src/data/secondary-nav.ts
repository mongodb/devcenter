const secondaryNavData = [
    {
        text: 'Documentation',
        dropdownItems: [
            { text: 'text 1', path: '/docs/' },
            { text: 'text 2', path: '/docs/' },
            { text: 'text 3', path: '/docs/' },
            { text: 'text 4', path: '/docs/' },
            { text: 'text 5', path: '/docs/' },
            { text: 'text 6', path: '/docs/' },
        ],
        path: 'https://docs.mongodb.com',
    },
    {
        text: 'Demo Apps',
        path: '/demoapps',
    },
    {
        text: 'Tutorials',
        path: '/tutorials',
        dropdownItems: [
            { text: 'text 1', path: '/tutorials/' },
            { text: 'text 2', path: '/tutorials/' },
            { text: 'text 3', path: '/tutorials/' },
            { text: 'text 4', path: '/tutorials/' },
            { text: 'text 5', path: '/tutorials/' },
            { text: 'text 6', path: '/tutorials/' },
        ],
    },
    {
        text: 'Code Examples',
        path: '/codeexamples',
    },
    {
        text: 'Articles',
        path: '/articles',
    },
];

export default secondaryNavData;
