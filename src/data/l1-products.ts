import { Taxonomy } from '../interfaces/taxonomy';

export const l1Products: Taxonomy[] = [
    {
        name: 'Atlas',
        slug: 'atlas',
        description:
            'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
        ctas: [
            { text: 'Primary CTA', url: 'https://www.mongodb.com/atlas' },
            {
                text: 'Secondary CTA',
                url: 'https://www.mongodb.com/cloud/atlas/register',
            },
        ],
        topics: [
            {
                title: 'Aggregation',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Atlas Search',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Charts',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Other Topic Here',
                href: '#',
                icon: 'atlas_search',
            },
        ],
        relatedTopics: [
            {
                title: 'Aggregation',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Atlas Search',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Charts',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Other Topic Here',
                href: '#',
                icon: 'atlas_search',
            },
        ],
    },
    {
        name: 'Data Lake',
        slug: 'data-lake',
        description:
            'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
        ctas: [
            { text: 'Primary CTA', url: 'https://www.mongodb.com/atlas' },
            {
                text: 'Secondary CTA',
                url: 'https://www.mongodb.com/cloud/atlas/register',
            },
        ],
        topics: [],
        relatedTopics: [],
    },
    {
        name: 'VS Code',
        slug: 'vs-code',
        description:
            'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
        ctas: [],
        topics: [],
        relatedTopics: [
            {
                title: 'Aggregation',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Atlas Search',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Charts',
                href: '#',
                icon: 'atlas_search',
            },
            {
                title: 'Other Topic Here',
                href: '#',
                icon: 'atlas_search',
            },
        ],
    },
];
