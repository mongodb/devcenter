/* eslint-disable */
// @ts-nocheck
import { ResponseComposition, RestContext, RestRequest, rest } from 'msw';

interface HandlerInfo {
    pattern: string;
    url: string;
    mockFile: string;
    fetchOptions?: RequestInit;
    handlerFunc?: (
        req: RestRequest,
        res: ResponseComposition,
        ctx: RestContext
    ) => any;
}

export const handlerInfo: HandlerInfo[] = [
    {
        pattern: `${process.env.REALM_SEARCH_URL}/search_devcenter`,
        url: `${process.env.REALM_SEARCH_URL}/search_devcenter`,
        mockFile: 'search_devcenter',
    },
    {
        pattern: `${process.env.REALM_API_URL}/community_events`,
        url: `${process.env.REALM_API_URL}/community_events`,
        mockFile: 'community_events',
    },
    {
        pattern: `https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg`,
        url: `https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg`,
        mockFile: 'mongodb-tv',
        fetchOptions: { headers: { apiKey: process.env.MONGODB_TV_API_KEY } },
    },
    {
        pattern: `${process.env.STRAPI_URL}/new-articles`,
        url: `${process.env.STRAPI_URL}/new-articles?_limit=-1`,
        mockFile: 'new-articles',
        handlerFunc: async (req, res, ctx) => {
            const bySlug = req.url.searchParams.get('calculated_slug_eq');
            const json = (await import(`./data/new-articles.js`)).default;

            if (bySlug) {
                const match = json.find(item => bySlug.includes(item.slug));

                if (match) {
                    return res(ctx.json([match]));
                }
            }

            return res(ctx.json(json));
        },
    },
    {
        pattern: `${process.env.STRAPI_URL}/content-types`,
        url: `${process.env.STRAPI_URL}/content-types`,
        mockFile: 'content-types',
    },
    {
        pattern: `${process.env.STRAPI_URL}/new-videos`,
        url: `${process.env.STRAPI_URL}/new-videos?_limit=-1`,
        mockFile: 'new-videos',
    },
    {
        pattern: `${process.env.STRAPI_URL}/upcoming-industry-events`,
        url: `${process.env.STRAPI_URL}/upcoming-industry-events?_limit=-1`,
        mockFile: 'upcoming-industry-events',
    },
    {
        pattern: `${process.env.STRAPI_URL}/podcast-series`,
        url: `${process.env.STRAPI_URL}/podcast-series?_limit=-1`,
        mockFile: 'podcast-series',
    },
    {
        pattern: `${process.env.STRAPI_URL}/l-1-products`,
        url: `${process.env.STRAPI_URL}/l-1-products?_limit=-1`,
        mockFile: 'l-1-products',
    },
    {
        pattern: `${process.env.STRAPI_URL}/l-2-products`,
        url: `${process.env.STRAPI_URL}/l-2-products?_limit=-1`,
        mockFile: 'l-2-products',
    },
    {
        pattern: `${process.env.STRAPI_URL}/authors`,
        url: `${process.env.STRAPI_URL}/authors?_limit=-1`,
        mockFile: 'authors',
        handlerFunc: async (req, res, ctx) => {
            const bySlug = req.url.searchParams.get('calculated_slug_eq');
            const json = (await import(`./data/authors.js`)).default;

            if (bySlug) {
                const match = json.find(item => bySlug.includes(item.slug));

                if (match) {
                    return res(ctx.json([match]));
                }
            }

            return res(ctx.json(json));
        },
    },
    {
        pattern: `${process.env.STRAPI_URL}/programming-languages`,
        url: `${process.env.STRAPI_URL}/programming-languages?_limit=-1`,
        mockFile: 'programming-languages',
    },
    {
        pattern: `${process.env.STRAPI_URL}/technologies`,
        url: `${process.env.STRAPI_URL}/technologies?_limit=-1`,
        mockFile: 'technologies',
    },
    {
        pattern: `${process.env.STRAPI_URL}/levels`,
        url: `${process.env.STRAPI_URL}/levels?_limit=-1`,
        mockFile: 'levels',
    },
    {
        pattern: `${process.env.STRAPI_URL}/featured-content*`,
        url: `${process.env.STRAPI_URL}/featured-content?_limit=-1`,
        mockFile: 'featured-content',
    },
    {
        pattern: `${process.env.STRAPI_URL}/podcasts`,
        url: `${process.env.STRAPI_URL}/podcasts?_limit=-1`,
        mockFile: 'podcasts',
    },
    {
        pattern: `${process.env.STRAPI_URL}/new-article-series`,
        url: `${process.env.STRAPI_URL}/new-article-series?_limit=-1`,
        mockFile: 'new-article-series',
    },
    {
        pattern: `${process.env.STRAPI_URL}/new-video-series`,
        url: `${process.env.STRAPI_URL}/new-video-series?_limit=-1`,
        mockFile: 'new-video-series',
    },
];

const handlers = handlerInfo.map(({ pattern, url, mockFile, handlerFunc }) =>
    rest.get(pattern, async (req, res, ctx) => {
        console.log(`[MSW] Request to ${url} mocked from ${mockFile}.js`);

        if (handlerFunc) {
            return await handlerFunc(req, res, ctx);
        }

        const json = (await import(`./data/${mockFile}.js`)).default;
        return res(ctx.json(json));
    })
);

export default handlers;
