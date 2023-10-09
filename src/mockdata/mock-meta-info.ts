import { MetaInfo } from '../interfaces/meta-info';

export const MOCK_META_INFO: MetaInfo[] = [
    {
        category: 'L1Product',
        ctas: [
            {
                text: 'Learn More',
                url: 'https://www.mongodb.com/connectors',
            },
        ],
        description:
            "MongoDB's official connectors for Kafka, Spark, BI tools, and more.",
        documentationLink: 'https://www.mongodb.com/docs/bi-connector/current/',
        slug: '/products/connectors',
        tagName: 'Connectors',
        topics: [],
    },
    {
        category: 'L1Product',
        ctas: [
            {
                text: 'Learn More',
                url: 'https://www.mongodb.com/docs/manual/',
            },
        ],
        description: 'MongoDB document database',
        documentationLink:
            'https://www.mongodb.com/docs/manual/tutorial/getting-started/',
        slug: '/products/mongodb',
        tagName: 'MongoDB',
        topics: [],
    },
    {
        category: 'L1Product',
        ctas: [
            {
                text: 'Learn More',
                url: 'https://www.mongodb.com/cloud/atlas/register',
            },
        ],
        description: 'MongoDB document database',
        documentationLink:
            'https://www.mongodb.com/docs/atlas/getting-started/',
        slug: '/products/atlas',
        tagName: 'Atlas',
        topics: [],
    },
    {
        category: 'L2Product',
        ctas: [
            {
                text: 'Learn More',
                url: 'https://www.mongodb.com/products/charts',
            },
        ],
        description: 'MongoDB Charts, visualize real-time application data.',
        documentationLink: 'https://www.mongodb.com/docs/charts/',
        slug: '/products/atlas/charts',
        tagName: 'Charts',
        topics: [],
    },
    {
        category: 'ProgrammingLanguage',
        ctas: [],
        description:
            'A lightweight, interpreted, object-oriented language. JavaScript engines execute JavaScript code in client-side (in web browsers) or server-side(for example, the V8 engine is a core component of the Node.js and Deno runtimes).',
        documentationLink: 'https://www.mongodb.com/docs/drivers/node/current/',
        slug: '/languages/javascript',
        tagName: 'JavaScript',
        topics: [],
    },
    {
        category: 'Technology',
        ctas: [],
        description: '',
        documentationLink: '',
        slug: '/technologies/nodejs',
        tagName: 'Node.js',
        topics: [],
    },
    {
        category: 'Technology',
        ctas: [],
        description: '',
        documentationLink: '',
        slug: '/technologies/react',
        tagName: 'React',
        topics: [],
    },
];
