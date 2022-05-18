import { EThirdPartyLogoVariant } from '@mdb/flora';
import { productToLogo } from '../utils/product-to-logo';

export const cardsLanguagesData = [
    {
        titleLink: {
            text: 'Java',
            url: '/developer/languages/java',
        },
        href: 'href',
        imageString: EThirdPartyLogoVariant.JAVA,
        cta: {
            text: 'See All',
            url: '/developer/languages/java',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/developer/languages/java/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/developer/languages/java/tutorials',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/',
            },
            {
                text: 'Code Examples',
                url: '/developer/languages/java/code-examples',
            },
        ],
    },
    {
        titleLink: {
            text: 'Python',
            url: '/developer/languages/python',
        },
        href: '/developer/languages/python',
        imageString: EThirdPartyLogoVariant.PYTHON_LOGOMARK,
        cta: {
            text: 'See All',
            url: '/developer/languages/python',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/developer/languages/python/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/developer/languages/python/tutorials',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/',
            },
            {
                text: 'Code Examples',
                url: '/developer/languages/python/code-examples',
            },
        ],
    },
    {
        titleLink: {
            text: 'C#',
            url: '/developer/languages/csharp',
        },
        href: '/developer/languages/csharp',
        imageString: EThirdPartyLogoVariant.C_SHARP,
        cta: {
            text: 'See All',
            url: '/developer/languages/csharp',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/developer/languages/csharp/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/developer/languages/csharp/tutorials',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/',
            },
            {
                text: 'Code Examples',
                url: '/developer/languages/csharp/code-examples',
            },
        ],
    },
    {
        titleLink: {
            text: 'Javascript',
            url: '/developer/languages/javascript',
        },
        href: '/developer/languages/javascript',
        imageString: EThirdPartyLogoVariant.JAVASCRIPT,
        cta: {
            text: 'See All',
            url: '/developer/languages/javascript',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/developer/languages/javascript/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/developer/languages/javascript/tutorials',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/',
            },
            {
                text: 'Code Examples',
                url: '/developer/languages/javascript/code-examples',
            },
        ],
    },
];

export const cardsTechnologiesData = [
    {
        titleLink: {
            text: 'AWS',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.AWS,
    },
    {
        titleLink: {
            text: 'Azure',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.AZURE,
    },
    {
        titleLink: {
            text: 'GCP',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.GOOGLE_CLOUD_LOGOMARK,
    },
    {
        titleLink: {
            text: 'NodeJS',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.NODEJS,
    },
    {
        titleLink: {
            text: '.Net Framework',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.DOTNET,
    },
    {
        titleLink: {
            text: 'Serverless',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: 'atlas_serverless',
    },
    {
        titleLink: {
            text: 'Unity',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.UNITY,
    },
    {
        titleLink: {
            text: 'Kubernetes',
            url: 'https://www.google.com/',
        },
        href: 'https://www.google.com/',
        imageString: EThirdPartyLogoVariant.KUBERNETES,
    },
];

export const cardsProductsData = [
    {
        titleLink: {
            text: 'Atlas',
            url: '/developer/products/atlas',
        },
        href: '/developer/products/atlas',
        imageString: productToLogo['Atlas'],
        description:
            'Cloud Document Database as a Service. The Easiest Way to Deploy, Operate, and Scale MongoDB.',
        cta: {
            text: 'More with Atlas',
            url: '/developer/products/atlas',
        },
        links: [
            {
                text: 'Data API',
                url: '/developer/products/atlas/data-api',
            },
            {
                text: 'Full Text Search',
                url: 'developer/products/atlas/full-text-search',
            },
            {
                text: 'GraphQL Integration',
                url: '/developer/technologies/graphQL',
            },
        ],
    },
    {
        titleLink: {
            text: 'Realm (Mobile)',
            url: '/developer/products/realm',
        },
        href: '/developer/products/realm',
        imageString: productToLogo['Realm (Mobile)'],
        description: "Get great mobile apps in user's hands, faster.",
        cta: {
            text: 'More with Realm',
            url: '/developer/products/realm',
        },
        links: [
            {
                text: 'Swift app development',
                url: 'developer/languages/swift',
            },
            {
                text: 'Android app development',
                url: '/developer/technologies/android',
            },
            {
                text: 'Realm Studio',
                url: '/developer/products/realm/studio',
            },
        ],
    },
    {
        titleLink: {
            text: 'MongoDB',
            url: '/developer/products/mongodb',
        },
        href: '/developer/products/mongodb',
        imageString: productToLogo['MongoDB'],
        description: 'MongoDB - the original document-oriented NoSQL database.',
        cta: {
            text: 'More with MongoDB',
            url: '/developer/products/mongodb',
        },
        links: [
            {
                text: 'MongoDB Compass',
                url: '/developer/products/compass',
            },
            {
                text: 'The MongoDB aggregation framework',
                url: '/developer/products/mongodb/aggregation-framework',
            },
            {
                text: 'Schema Design and Data Modeling',
                url: '/developer/products/mongodb/schema',
            },
        ],
    },
];
