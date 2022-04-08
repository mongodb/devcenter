import { Taxonomy } from '../interfaces/taxonomy';

export const languages: Taxonomy[] = [
    {
        name: 'C',
        slug: 'c',
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
        name: 'CSharp',
        slug: 'csharp',
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
        name: 'Python',
        slug: 'python',
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
                name: 'Atlas',
                slug: 'atlas',
                icon: 'atlas_search',
                category: 'product',
            },
            {
                name: 'AWS',
                slug: 'aws',
                icon: 'atlas_search',
                category: 'technology',
            },
        ],
    },
];
