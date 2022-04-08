import { Taxonomy } from '../interfaces/taxonomy';

export const l2Products: Taxonomy[] = [
    {
        name: 'Change Streams',
        slug: 'atlas/change-streams',
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
        name: 'Document Model',
        slug: 'atlas/document-model',
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
];
