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
        subTopics: [
            {
                name: 'Change Streams',
                slug: 'atlas/change-streams',
                icon: 'atlas_search',
                category: 'product',
            },
            {
                name: 'Document Model',
                slug: 'atlas/document-model',
                icon: 'atlas_search',
                category: 'product',
            },
        ],
        relatedTopics: [],
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
        subTopics: [],
        relatedTopics: [],
    },
    {
        name: 'VS Code',
        slug: 'vs-code',
        description:
            'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
        ctas: [],
        subTopics: [],
        relatedTopics: [
            {
                name: 'Data Lake',
                slug: 'data-lake',
                icon: 'atlas_search',
                category: 'product',
            },
            {
                name: 'VS Code',
                slug: 'vs-code',
                icon: 'atlas_search',
                category: 'product',
            },
            {
                name: 'Android',
                slug: 'android',
                icon: 'atlas_search',
                category: 'technology',
            },
        ],
    },
];
