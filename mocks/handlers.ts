/* eslint-disable */
// @ts-nocheck
import { ResponseComposition, RestContext, RestRequest, rest } from 'msw';
interface RESTHandlerInfo {
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
        pattern: `https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg`,
        url: `https://data.mongodb-api.com/app/mongodb-tv-app-bsvzg/endpoint/api/epg`,
        mockFile: 'mongodb-tv',
        fetchOptions: { headers: { apiKey: process.env.MONGODB_TV_API_KEY } },
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

const handlers = restHandlers;

export default handlers;
