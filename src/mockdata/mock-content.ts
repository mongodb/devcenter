import { ContentItem } from '../interfaces/content-item';

export const MOCK_ARTICLE_CONTENT = [
    {
        collectionType: 'Article',
        authors: [
            {
                name: 'Josman Pérez Expóstio',
                bio: 'If I had to sum up my professional interests in one sentence, I could only say that I am passionate about technology.',
                calculated_slug: '/author/josman-p-rez-exp-stio',
                twitter: 'https://twitter.com/josman_perez',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/1_Q_Vs_Qt_Gv_B0_Hlailn_Bzvtk_KQ_aeaacfdbfb.jpeg',
                },
            },
        ],
        category: 'Tutorial',
        contentDate: '2021-05-25T14:26:19.333Z',
        updateDate: '2022-07-19T16:19:21.975Z',
        description:
            'The aim of this tutorial is to learn how to use Custom Resolvers for complex use cases.',
        slug: 'products/realm/realm-graphql-demo-custom-resolvers',
        tags: [
            {
                name: 'Tutorial',
                slug: '/tutorials',
                type: 'ContentType',
            },
            {
                name: 'GraphQL',
                slug: '/technologies/graphql',
                type: 'Technology',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'AuthorType',
            },
            {
                name: 'Realm',
                slug: '/products/realm',
                type: 'L1Product',
            },
            {
                name: 'English',
                slug: '/spoken-languages/english',
                type: 'SpokenLanguage',
            },
            {
                name: 'Advanced',
                slug: '/expertise-levels/advanced',
                type: 'ExpertiseLevel',
            },
        ],
        title: 'Realm GraphQL Demo: Custom Resolvers',
        seo: {
            meta_description:
                'The aim of this tutorial is to learn how to use Custom Resolvers for complex use cases.',
            og_image: {
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/og_realm_logo_051fdf4e96.jpeg',
            },
            twitter_image: {
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/twitter_realm_logo_c4ca57c90d.jpeg',
            },
        },
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/realm_logo_df21d716eb.jpeg',
            alt: 'random alt',
        },
        series: {
            title: 'Realm Series',
            seriesEntry: [
                {
                    title: 'Realm Data Types',
                    calculatedSlug: '/products/realm/realm-data-types',
                },
                {
                    title: 'Realm GraphQL Demo: Custom Resolvers',
                    calculatedSlug:
                        '/products/realm/realm-graphql-demo-custom-resolvers',
                },
            ],
        },
    },
] as ContentItem[];
