/* eslint-disable */
// @ts-nocheck
import {
    ResponseComposition,
    RestContext,
    RestRequest,
    rest,
    graphql,
} from 'msw';
import { ContentTypeUID } from '../src/interfaces/meta-info';
import { CS_GRAPHQL_LIMIT } from '../src/data/constants';
interface RESTHandlerInfo {
    pattern: string;
    url: string;
    mockFile: string;
    handlerFunc?: (
        req: RestRequest,
        res: ResponseComposition,
        ctx: RestContext
    ) => any;
}

interface GQLHandlerInfo {
    contentTypeUID: ContentTypeUID;
    queryName: string;
    mockFile: string;
}

export const restHandlerInfo: RESTHandlerInfo[] = [
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

export const gqlHandlerInfo: GQLHandlerInfo[] = [
    {
        contentTypeUID: 'content_types',
        queryName: 'get_all_content_types',
        mockFile: 'content-types',
    },
    {
        contentTypeUID: 'l1_products',
        queryName: 'get_all_l1_products',
        mockFile: 'l-1-products',
    },
    {
        contentTypeUID: 'l2_products',
        queryName: 'get_all_l2_products',
        mockFile: 'l-2-products',
    },
    {
        contentTypeUID: 'programming_languages',
        queryName: 'get_all_programming_languages',
        mockFile: 'programming-languages',
    },
    {
        contentTypeUID: 'technologies',
        queryName: 'get_all_technologies',
        mockFile: 'technologies',
    },
    {
        contentTypeUID: 'levels',
        queryName: 'get_all_levels',
        mockFile: 'levels',
    },
];

const restHandlers = restHandlerInfo.map(
    ({ pattern, url, mockFile, handlerFunc }) =>
        rest.get(pattern, async (req, res, ctx) => {
            console.log(
                `[MSW] REST request to ${url} mocked from ${mockFile}.js`
            );

            if (handlerFunc) {
                return await handlerFunc(req, res, ctx);
            }

            const json = (await import(`./data/${mockFile}.js`)).default;
            return res(ctx.json(json));
        })
);

const gqlHandlers = gqlHandlerInfo.map(({ queryName, mockFile }) =>
    graphql.query(queryName, async (req, res, ctx) => {
        console.log(
            `[MSW] GraphQL query "${queryName}" mocked from ${mockFile}.js`
        );
        const params = req.url.searchParams;
        const query = params.get('query');
        const skip = Number(query.split('skip: ')[1].split(')')[0]);
        const fileIndex = skip / CS_GRAPHQL_LIMIT;
        // Will have to adjust for getting individual entries.
        const json = (await import(`./data/${mockFile}-${fileIndex}.js`))
            .default;
        return res(ctx.data(json));
    })
);

const handlers = restHandlers.concat(gqlHandlers);

export default handlers;
