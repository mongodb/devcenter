import { STRAPI_CLIENT } from '../config/api-client';
import { ContentItem } from '../interfaces/content-item';
import { getArticleBySlugFromAPI } from '../api-requests/get-articles';
import { getVideoBySlug } from '../service/get-all-videos';
import { getPodcastBySlug } from '../service/get-all-podcasts';
import allArticleSeries from './get-all-article-series.preval';
import allVideoSeries from './get-all-video-series.preval';
import allPodcastSeries from './get-all-podcast-series.preval';
import { CollectionType } from '../types/collection-type';
import {
    mapPodcastsToContentItems,
    mapVideosToContentItems,
    mapArticlesToContentItems,
    mapEventsToContentItems,
} from './build-content-items';
import { Article } from '../interfaces/article';
import { Video } from '../interfaces/video';
import { Podcast } from '../interfaces/podcast';

export const getContentItemFromSlug: (
    slug: string
) => Promise<ContentItem | null> = async (slug: string) => {
    slug = '/' + slug;
    let content: Article | Video | Podcast | any = null;
    let contentType: CollectionType | any = null;

    // videos always starts with /videos
    if (slug.startsWith('/videos')) {
        content = await getVideoBySlug(slug);
        contentType = 'Video';
    } else if (slug.startsWith('/podcasts')) {
        content = await getPodcastBySlug(slug);
        contentType = 'Podcast';
    } else if (slug.startsWith('/events')) {
        content = mockEventData;
        contentType = 'Event';
    } else {
        content = await getArticleBySlugFromAPI(STRAPI_CLIENT, slug);
        contentType = 'Article';
    }

    if (!content) return null;

    if (contentType === 'Article') {
        const mappedArticles = mapArticlesToContentItems(
            [content as Article],
            allArticleSeries
        );
        return mappedArticles[0];
    } else if (contentType === 'Podcast') {
        const mappedPodcasts = mapPodcastsToContentItems(
            [content as Podcast],
            allPodcastSeries
        );
        return mappedPodcasts[0];
    } else if (contentType === 'Video') {
        const mappedVideos = mapVideosToContentItems(
            [content as Video],
            allVideoSeries
        );
        return mappedVideos[0];
    } else if ((contentType = 'Event')) {
        return mapEventsToContentItems(content).find(e => e.slug === slug);
    }

    return content;
};

const mockEventData = [
    {
        type: 'Hybrid',
        speakers: [
            {
                name: 'Philip Eschenbacher',
                bio: 'Developer by heart Living in Switzerland 25 years of experience (mainly banking) Focus on web technologies and mobile',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Senior Solution Architect @ MongoDB',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
            {
                name: 'Michael Höller',
                bio: 'As an independent consultant I work with customers to build data architectures using modern technology stacks and NoSQL data stores. I support engineering teams to design, build and deploy performant and scalable MongoDB applications. I’m humbled and honoured to have received the MonogDB Innovation award 2021 and to be part of the founding members of the MongoDB Champions Program.',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Solution Architect, Scrum Master',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        _id: '6384eed21509c54e2e383fdf',
        coordinates: {
            lat: 36.778261,
            lng: -119.4179324,
        },
        content:
            'Code PaLOUsa is a multi-day software development conference designed to cover all aspects of software development regardless of the technology stack. The conference schedule features presentations from well-known professionals in the software development community. The conference also features exhibitor tables where leading software development companies interact with attendees to show off their latest wares. New for 2022, the event will be held both in-person and online.',
        title: 'events 101',
        location: 'california',
        virtual_meetup_url:
            'https://www.mongodb.com/community/forums/t/mongodb-atlas-google-cloud-north-america-roadshow/198576',
        virtual_meetup_url_text: 'Custom Virtual Display Link',
        registration_url: 'https://mongodbdaybengaluru.splashthat.com/',
        published_at: '2022-11-28T17:33:10.480Z',
        primary_tag: [
            {
                __component: 'primary-tag-info.l1-product',
                _id: '6384f09a1509c54e2e383fe0',
                __v: 0,
                l_1_product: {
                    _id: '624af083ce7cde001ccae945',
                    name: 'MongoDB',
                    published_at: '2022-05-09T18:39:39.595Z',
                    createdAt: '2022-04-04T13:20:03.867Z',
                    updatedAt: '2022-05-24T18:20:24.605Z',
                    __v: 0,
                    calculated_slug: '/products/mongodb',
                    description: 'MongoDB document database.',
                    primary_cta: 'https://www.mongodb.com/docs/manual/',
                    documentation_link:
                        'https://www.mongodb.com/docs/manual/tutorial/getting-started/',
                    id: '624af083ce7cde001ccae945',
                },
                id: '6384f09a1509c54e2e383fe0',
            },
        ],
        other_tags: [
            {
                l2Product: null,
                spokenLanguage: null,
                expertiseLevel: null,
                githubUrl: null,
                liveSiteUrl: null,
                codeType: null,
                technology: [],
                l1Product: {
                    name: 'MongoDB',
                    calculatedSlug: '/products/mongodb',
                },
                contentType: {
                    contentType: 'Article',
                    calculatedSlug: '/articles',
                },
                authorType: {
                    name: 'MongoDB',
                    calculatedSlug: '/author-types/mongodb',
                },
                programmingLanguage: [
                    { name: 'Ruby', calculatedSlug: '/languages/ruby' },
                    { name: 'Python', calculatedSlug: '/languages/python' },
                    { name: 'Java', calculatedSlug: '/languages/java' },
                ],
            },
        ],
        createdAt: '2022-11-28T17:24:34.936Z',
        updatedAt: '2022-11-28T17:45:03.910Z',
        __v: 0,
        end_time: '2022-11-30T17:00:00.000Z',
        start_time: '2022-11-29T17:00:00.000Z',
        calculated_slug: '/events/test-har2',
        slug: '/events/mock-event-1',
        id: '6384eed21509c54e2e383fdf',
    },
    {
        type: 'Hybrid',
        speakers: [
            {
                name: 'Philip Eschenbacher',
                bio: 'Developer by heart Living in Switzerland 25 years of experience (mainly banking) Focus on web technologies and mobile',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Senior Solution Architect @ MongoDB',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
            {
                name: 'Michael Höller',
                bio: 'As an independent consultant I work with customers to build data architectures using modern technology stacks and NoSQL data stores. I support engineering teams to design, build and deploy performant and scalable MongoDB applications. I’m humbled and honoured to have received the MonogDB Innovation award 2021 and to be part of the founding members of the MongoDB Champions Program.',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Solution Architect, Scrum Master',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        _id: '6384f3f394b1824f4ff8ca8c',
        coordinates: {
            lat: 52.3675734,
            lng: 4.9041389,
        },
        content: '',
        title: 'event 104',
        location: 'Amsterdam',
        start_time: '2022-11-30T17:00:00.000Z',
        end_time: '2022-12-01T17:00:00.000Z',
        published_at: '2022-11-28T17:51:07.361Z',
        primary_tag: [
            {
                __component: 'primary-tag-info.l1-product',
                _id: '6384f43194b1824f4ff8ca8d',
                __v: 0,
                l_1_product: {
                    _id: '624af083ce7cde001ccae945',
                    name: 'MongoDB',
                    published_at: '2022-05-09T18:39:39.595Z',
                    createdAt: '2022-04-04T13:20:03.867Z',
                    updatedAt: '2022-05-24T18:20:24.605Z',
                    __v: 0,
                    calculated_slug: '/products/mongodb',
                    description: 'MongoDB document database.',
                    primary_cta: 'https://www.mongodb.com/docs/manual/',
                    documentation_link:
                        'https://www.mongodb.com/docs/manual/tutorial/getting-started/',
                    id: '624af083ce7cde001ccae945',
                },
                id: '6384f43194b1824f4ff8ca8d',
            },
        ],
        other_tags: [
            {
                l2Product: null,
                spokenLanguage: null,
                expertiseLevel: null,
                githubUrl: null,
                liveSiteUrl: null,
                codeType: null,
                technology: [],
                l1Product: {
                    name: 'MongoDB',
                    calculatedSlug: '/products/mongodb',
                },
                contentType: {
                    contentType: 'Article',
                    calculatedSlug: '/articles',
                },
                authorType: {
                    name: 'MongoDB',
                    calculatedSlug: '/author-types/mongodb',
                },
                programmingLanguage: [
                    { name: 'Ruby', calculatedSlug: '/languages/ruby' },
                    { name: 'Python', calculatedSlug: '/languages/python' },
                    { name: 'Java', calculatedSlug: '/languages/java' },
                ],
            },
        ],
        createdAt: '2022-11-28T17:46:27.076Z',
        updatedAt: '2022-11-28T19:57:13.483Z',
        __v: 0,
        calculated_slug: '/events/testing-strapi-publish',
        slug: '/events/mock-event',
        virtual_meetup_url:
            'https://www.mongodb.com/community/forums/t/mongodb-atlas-google-cloud-north-america-roadshow/198576',
        virtual_meetup_url_text: 'Custom Virtual Display Link',
        registration_url: 'https://mongodbdaybengaluru.splashthat.com/',
        id: '6384f3f394b1824f4ff8ca8c',
    },
    {
        type: 'Virtual',
        speakers: [
            {
                name: 'Philip Eschenbacher',
                bio: 'Developer by heart Living in Switzerland 25 years of experience (mainly banking) Focus on web technologies and mobile',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Senior Solution Architect @ MongoDB',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
            {
                name: 'Michael Höller',
                bio: 'As an independent consultant I work with customers to build data architectures using modern technology stacks and NoSQL data stores. I support engineering teams to design, build and deploy performant and scalable MongoDB applications. I’m humbled and honoured to have received the MonogDB Innovation award 2021 and to be part of the founding members of the MongoDB Champions Program.',
                calculated_slug: '/author/alex-bevilacqua',
                twitter: null,
                title: 'Solution Architect, Scrum Master',
                image: {
                    url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/image_a6cbc34a66.png',
                },
            },
        ],
        _id: '6384f567c9b0a750de8c0336',
        coordinates: {
            lat: 28.4881722,
            lng: 77.092803,
        },
        content: '',
        title: 'event 103',
        published_at: '2022-11-28T17:54:53.038Z',
        primary_tag: [
            {
                __component: 'primary-tag-info.l1-product',
                _id: '6384f58bc9b0a750de8c0337',
                __v: 0,
                l_1_product: {
                    _id: '624af083ce7cde001ccae945',
                    name: 'MongoDB',
                    published_at: '2022-05-09T18:39:39.595Z',
                    createdAt: '2022-04-04T13:20:03.867Z',
                    updatedAt: '2022-05-24T18:20:24.605Z',
                    __v: 0,
                    calculated_slug: '/products/mongodb',
                    description: 'MongoDB document database.',
                    primary_cta: 'https://www.mongodb.com/docs/manual/',
                    documentation_link:
                        'https://www.mongodb.com/docs/manual/tutorial/getting-started/',
                    id: '624af083ce7cde001ccae945',
                },
                id: '6384f58bc9b0a750de8c0337',
            },
        ],
        other_tags: [
            {
                l2Product: null,
                spokenLanguage: null,
                expertiseLevel: null,
                githubUrl: null,
                liveSiteUrl: null,
                codeType: null,
                technology: [],
                l1Product: {
                    name: 'MongoDB',
                    calculatedSlug: '/products/mongodb',
                },
                contentType: {
                    contentType: 'Article',
                    calculatedSlug: '/articles',
                },
                authorType: {
                    name: 'MongoDB',
                    calculatedSlug: '/author-types/mongodb',
                },
                programmingLanguage: [
                    { name: 'Ruby', calculatedSlug: '/languages/ruby' },
                    { name: 'Python', calculatedSlug: '/languages/python' },
                    { name: 'Java', calculatedSlug: '/languages/java' },
                ],
            },
        ],
        createdAt: '2022-11-28T17:52:39.854Z',
        updatedAt: '2022-11-28T17:54:53.360Z',
        __v: 0,
        end_time: '2022-11-28T18:30:00.000Z',
        start_time: '2022-11-28T17:00:00.000Z',
        location:
            'Tower 8th Road, Sikandarpur Upas, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122022',
        virtual_meetup_url:
            'https://www.mongodb.com/community/forums/t/mongodb-atlas-google-cloud-north-america-roadshow/198576',
        virtual_meetup_url_text: 'Custom Virtual Display Link',
        registration_url: 'https://mongodbdaybengaluru.splashthat.com/',
        calculated_slug: '/events/test-har3',
        slug: '/events/mock-event-2',
        id: '6384f567c9b0a750de8c0336',
    },
];
