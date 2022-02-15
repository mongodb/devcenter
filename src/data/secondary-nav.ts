const secondaryNavData = [
    {
        text: 'Documentation',
        dropdown: true,
        dropdownItems: [
            { text: 'Dropdown 1', path: '/docs/' },
            { text: 'Dropdown 1', path: '/docs/' },
            { text: 'Dropdown 1', path: '/docs/' },
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
        dropdown: true,
        dropdownItems: [
            { text: 'Dropdown 2', path: '/docs/' },
            { text: 'Dropdown 2', path: '/docs/' },
            { text: 'Dropdown 2', path: '/docs/' },
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
