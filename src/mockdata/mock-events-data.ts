import { SearchItem } from '../components/search/types';
import { ContentItem } from '../interfaces/content-item';

const mockResults = [
    {
        name: 'MongoDB.local San Francisco',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'InPerson',
                type: 'AttendanceType',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
        ],
        type: 'Event',
        description:
            'Educational breakout sessions, an announcement-packed keynote presentation, customer stories, free 1:1 Ask the Experts consulting sessions, networking opportunities, and more.',
        location: 'San Francisco, United States | IN-PERSON',
        date: '2022-10-24T19:00:00.000Z',
        image: {
            alternativeText: 'Easy deployment of MEAN stack',
            url: '',
            city: 'London',
        },
        authors: [],
        slug: '/events/mock-event-1',
    },
    {
        name: 'MonogDB @ Datadog Dash 2022',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'Docs',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'Realm',
                type: 'L1Product',
                slug: '/products/realm',
            },
            {
                name: 'Search',
                type: 'L2Product',
                slug: '/products/atlas/search',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
            {
                name: 'Virtual',
                type: 'AttendanceType',
            },
        ],
        type: 'Event',
        description:
            'MongoDB is thrilled to be a Gold Sponsor at Dash 2022 in New York City this year. Dash is an annual conference about building and scaling the next generation of applications, infrastructure, security, and technical teams. Be sure to visit our booth and our speaking session.',
        location: 'New York City, United States | Hybrid',
        date: '2022-10-24T19:00:00.000Z',
        image: {
            alternativeText: 'Easy deployment of MEAN stack',
            url: '',
            city: 'Thiruvananthapuram',
        },
        authors: [],
        slug: '/events/mock-event-2',
    },
    {
        name: 'RomeMUG Meetup#3 MongoDB per il Content Management & Ops Manager e dintorni',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'Docs',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'Realm',
                type: 'L1Product',
                slug: '/products/realm',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
            {
                name: 'Hybrid',
                type: 'AttendanceType',
            },
        ],
        type: 'Event',
        description:
            'RomeMUG è lieta di annunciarvi il terzo meetup rigorosamente in presenza  Thursday, September 8, 2022 1:00 PM presso il The Hub - LVenture Group di Roma Termini. L’evento includerà due lightning talk con demo, bevande e swag marchiati MongoDB! 🎁',
        location: 'San Francisco, United States | IN-PERSON',
        date: '2022-10-24T19:00:00.000Z',
        image: {
            alternativeText: 'Easy deployment of MEAN stack',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/easy_deployment_mean_stack_fc5b1fe0a4.png',
        },
        authors: [],
        slug: '/events/mock-event-3',
    },
] as SearchItem[];

const mockContent = [
    {
        authors: [],
        category: 'Event',
        contentDate: '2022-10-24T19:00:00.000Z',
        description:
            'Educational breakout sessions, an announcement-packed keynote presentation, customer stories, free 1:1 Ask the Experts consulting sessions, networking opportunities, and more.',
        image: {
            url: '',
            alt: 'Easy deployment of MEAN stack',
            city: 'New York City',
        },
        slug: '/events/mock-event-1',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'InPerson',
                type: 'AttendanceType',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
        ],
        title: 'MongoDB.local San Francisco',
        featured: false,
    },
    {
        authors: [],
        category: 'Event',
        contentDate: '2022-10-24T19:00:00.000Z',
        description:
            'MongoDB is thrilled to be a Gold Sponsor at Dash 2022 in New York City this year. Dash is an annual conference about building and scaling the next generation of applications, infrastructure, security, and technical teams. Be sure to visit our booth and our speaking session.',
        image: {
            url: '',
            alt: 'Easy deployment of MEAN stack',
            city: 'Thiruvananthapuram',
        },
        slug: '/events/mock-event-2',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'Docs',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'Realm',
                type: 'L1Product',
                slug: '/products/realm',
            },
            {
                name: 'Search',
                type: 'L2Product',
                slug: '/products/atlas/search',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
            {
                name: 'Virtual',
                type: 'AttendanceType',
            },
        ],
        title: 'MonogDB @ Datadog Dash 2022',
        featured: false,
    },
    {
        authors: [],
        category: 'Event',
        contentDate: '2022-10-24T19:00:00.000Z',
        description:
            'RomeMUG è lieta di annunciarvi il terzo meetup rigorosamente in presenza  Thursday, September 8, 2022 1:00 PM presso il The Hub - LVenture Group di Roma Termini. L’evento includerà due lightning talk con demo, bevande e swag marchiati MongoDB! 🎁',
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/easy_deployment_mean_stack_fc5b1fe0a4.png',
            alt: 'Easy deployment of MEAN stack',
        },
        slug: '/events/mock-event-3',
        tags: [
            {
                name: 'Atlas Data Lake',
                slug: '/products/atlas/',
                type: 'Product',
            },
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'Docs',
                slug: '/author-types/mongodb',
                type: 'EventType',
            },
            {
                name: 'Realm',
                type: 'L1Product',
                slug: '/products/realm',
            },
            {
                name: 'JavaScript',
                type: 'ProgrammingLanguage',
                slug: '/languages/javascript',
            },
            {
                name: 'Hybrid',
                type: 'AttendanceType',
            },
        ],
        title: 'RomeMUG Meetup#3 MongoDB per il Content Management & Ops Manager e dintorni',
        featured: false,
    },
] as ContentItem[];

const mockFeatured = [
    {
        collectionType: 'Event',
        authors: [
            {
                name: 'Author',
                bio: null,
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        category: 'Event',
        contentDate: '2022-10-31T19:00:00.000Z',
        updateDate: '2022-10-31T18:02:37.969Z',
        description: 'This is a mock description for a fake event',
        slug: '/events/mock-event',
        tags: [
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'AuthorType',
            },
            {
                name: 'MongoDB',
                slug: '/products/mongodb',
                type: 'L1Product',
            },
        ],
        title: 'MongoDB.local San Francisco',
        codeType: null,
        githubUrl: null,
        liveSiteUrl: null,
        seo: {
            canonical_url: null,
            meta_description: 'This is a mock description for a fake event',
            og_description: 'This is a mock description for a fake event',
            og_title: null,
            og_type: null,
            og_url: null,
            twitter_card: null,
            twitter_creator: null,
            twitter_description: 'This is a mock description for a fake event',
            twitter_image: null,
            twitter_site: null,
            twitter_title: null,
            og_image: {
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            },
        },
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            alt: 'random alt',
        },
        location: 'San Francisco, United States | IN-PERSON',
    },
    {
        collectionType: 'Event',
        authors: [
            {
                name: 'Author',
                bio: null,
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        category: 'Event',
        contentDate: '2022-10-31T19:00:00.000Z',
        updateDate: '2022-10-31T18:02:37.969Z',
        description: 'This is a mock description for a fake event',
        slug: '/events/mock-event',
        tags: [
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'AuthorType',
            },
            {
                name: 'MongoDB',
                slug: '/products/mongodb',
                type: 'L1Product',
            },
        ],
        title: 'MonogDB @ Datadog Dash 2022',
        codeType: null,
        githubUrl: null,
        liveSiteUrl: null,
        seo: {
            canonical_url: null,
            meta_description: 'This is a mock description for a fake event',
            og_description: 'This is a mock description for a fake event',
            og_title: null,
            og_type: null,
            og_url: null,
            twitter_card: null,
            twitter_creator: null,
            twitter_description: 'This is a mock description for a fake event',
            twitter_image: null,
            twitter_site: null,
            twitter_title: null,
            og_image: {
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            },
        },
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            alt: 'random alt',
        },
        location: 'San Francisco, United States | IN-PERSON',
    },
    {
        collectionType: 'Event',
        authors: [
            {
                name: 'Author',
                bio: null,
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        category: 'Event',
        contentDate: '2022-10-31T19:00:00.000Z',
        updateDate: '2022-10-31T18:02:37.969Z',
        description: 'This is a mock description for a fake event',
        slug: '/events/mock-event',
        tags: [
            {
                name: 'Event',
                slug: '/events',
                type: 'ContentType',
            },
            {
                name: 'MongoDB',
                slug: '/author-types/mongodb',
                type: 'AuthorType',
            },
            {
                name: 'MongoDB',
                slug: '/products/mongodb',
                type: 'L1Product',
            },
        ],
        title: 'RomeMUG Meetup#3 MongoDB per il Content Management & Ops Manager e dintorni',
        codeType: null,
        githubUrl: null,
        liveSiteUrl: null,
        seo: {
            canonical_url: null,
            meta_description: 'This is a mock description for a fake event',
            og_description: 'This is a mock description for a fake event',
            og_title: null,
            og_type: null,
            og_url: null,
            twitter_card: null,
            twitter_creator: null,
            twitter_description: 'This is a mock description for a fake event',
            twitter_image: null,
            twitter_site: null,
            twitter_title: null,
            og_image: {
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            },
        },
        image: {
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pink2_3220fb1c27_112dfb7ace.webp',
            alt: 'random alt',
        },
        location: 'San Francisco, United States | IN-PERSON',
    },
];

export { mockFeatured, mockResults, mockContent };
