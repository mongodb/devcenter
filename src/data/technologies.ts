import { Taxonomy } from '../interfaces/taxonomy';

export const technologies: Taxonomy[] = [
    {
        name: 'Android',
        slug: 'android',
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
        name: 'AWS',
        slug: 'aws',
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
        name: 'Kafka',
        slug: 'kafka',
        description:
            'Blurb consisting of a description of the title or tag for the page. No more than 2 - 3 lines, and 5 column max',
        ctas: [],
        topics: [],
        relatedTopics: [],
    },
];
