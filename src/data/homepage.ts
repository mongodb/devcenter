import { EThirdPartyLogoVariant } from '@mdb/flora';
import { productToLogo } from '../utils/product-to-logo';

export const cardsLanguagesData = [
    {
        titleLink: {
            text: 'Java',
            url: '/languages/java',
        },
        href: '/languages/java',
        imageString: EThirdPartyLogoVariant.JAVA,
        cta: {
            text: 'See All',
            url: '/languages/java',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/languages/java/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/languages/java/tutorials',
            },
            {
                text: 'Code Examples',
                url: '/languages/java/code-examples',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/drivers/java-drivers/',
            },
        ],
    },
    {
        titleLink: {
            text: 'Python',
            url: '/languages/python',
        },
        href: '/languages/python',
        imageString: EThirdPartyLogoVariant.PYTHON_LOGOMARK,
        cta: {
            text: 'See All',
            url: '/languages/python',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/languages/python/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/languages/python/tutorials',
            },
            {
                text: 'Code Examples',
                url: '/languages/python/code-examples',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/drivers/python/',
            },
        ],
    },
    {
        titleLink: {
            text: 'C#',
            url: '/languages/csharp',
        },
        href: '/languages/csharp',
        imageString: EThirdPartyLogoVariant.C_SHARP,
        cta: {
            text: 'See All',
            url: '/languages/csharp',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/languages/csharp/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/languages/csharp/tutorials',
            },
            {
                text: 'Code Examples',
                url: '/languages/csharp/code-examples',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/drivers/csharp/',
            },
        ],
    },
    {
        titleLink: {
            text: 'JavaScript',
            url: '/languages/javascript',
        },
        href: '/languages/javascript',
        imageString: EThirdPartyLogoVariant.JAVASCRIPT,
        cta: {
            text: 'See All',
            url: '/languages/javascript',
        },
        links: [
            {
                text: 'Quickstarts',
                url: '/languages/javascript/quickstarts',
            },
            {
                text: 'Tutorials',
                url: '/languages/javascript/tutorials',
            },
            {
                text: 'Code Examples',
                url: '/languages/javascript/code-examples',
            },
            {
                text: 'Documentation',
                url: 'https://www.mongodb.com/docs/drivers/node/current/',
            },
        ],
    },
];

export const cardsTechnologiesData = [
    {
        titleLink: {
            text: 'AWS',
            url: '/technologies/aws',
        },
        href: '/technologies/aws',
        imageString: EThirdPartyLogoVariant.AWS,
    },
    {
        titleLink: {
            text: 'Azure',
            url: '/technologies/azure',
        },
        href: '/technologies/azure',
        imageString: EThirdPartyLogoVariant.AZURE,
    },
    {
        titleLink: {
            text: 'GCP',
            url: '/technologies/gcp',
        },
        href: '/technologies/gcp',
        imageString: EThirdPartyLogoVariant.GOOGLE_CLOUD_LOGOMARK,
    },
    {
        titleLink: {
            text: 'NodeJS',
            url: '/technologies/nodejs',
        },
        href: '/technologies/nodejs',
        imageString: EThirdPartyLogoVariant.NODEJS,
    },
    {
        titleLink: {
            text: '.Net Framework',
            url: '/technologies/dotnet-framework',
        },
        href: '/technologies/dotnet-framework',
        imageString: EThirdPartyLogoVariant.DOTNET,
    },
    {
        titleLink: {
            text: 'Serverless',
            url: '/technologies/serverless',
        },
        href: '/technologies/serverless',
        imageString: 'atlas_serverless',
    },
    {
        titleLink: {
            text: 'Unity',
            url: '/technologies/unity',
        },
        href: '/technologies/unity',
        imageString: EThirdPartyLogoVariant.UNITY,
    },
    {
        titleLink: {
            text: 'Kubernetes',
            url: '/technologies/kubernetes',
        },
        href: '/technologies//kubernetes',
        imageString: EThirdPartyLogoVariant.KUBERNETES,
    },
];

export const cardsProductsData = [
    {
        titleLink: {
            text: 'Atlas',
            url: '/products/atlas',
        },
        href: '/products/atlas',
        imageString: productToLogo['Atlas'],
        description:
            'Cloud Document Database as a Service. The Easiest Way to Deploy, Operate, and Scale MongoDB.',
        cta: {
            text: 'More with Atlas',
            url: '/products/atlas',
        },
        links: [
            {
                text: 'Data API',
                url: '/products/atlas/data-api',
            },
            {
                text: 'Full Text Search',
                url: '/products/atlas/full-text-search',
            },
            {
                text: 'GraphQL Integration',
                url: '/technologies/graphql',
            },
        ],
    },
    {
        titleLink: {
            text: 'Realm (Mobile)',
            url: '/products/realm',
        },
        href: '/products/realm',
        imageString: productToLogo['Realm (Mobile)'],
        description: "Get great mobile apps in user's hands, faster.",
        cta: {
            text: 'More with Realm',
            url: '/products/realm',
        },
        links: [
            {
                text: 'Swift app development',
                url: '/languages/swift',
            },
            {
                text: 'Android app development',
                url: '/technologies/android',
            },
            {
                text: 'Realm Studio',
                url: '/products/realm/studio',
            },
        ],
    },
    {
        titleLink: {
            text: 'MongoDB',
            url: '/products/mongodb',
        },
        href: '/products/mongodb',
        imageString: productToLogo['MongoDB'],
        description: 'MongoDB - the original document-oriented NoSQL database.',
        cta: {
            text: 'More with MongoDB',
            url: '/products/mongodb',
        },
        links: [
            {
                text: 'MongoDB Compass',
                url: '/products/compass',
            },
            {
                text: 'The MongoDB aggregation framework',
                url: '/products/mongodb/aggregation-framework',
            },
            {
                text: 'Schema Design and Data Modeling',
                url: '/products/mongodb/schema',
            },
        ],
    },
];
