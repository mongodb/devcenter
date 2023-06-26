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
import { getMetaInfoQuery } from '../src/api-requests/get-all-meta-info';
// import { getAllAuthorsQuery } from '../src/api-requests/get-authors';
// import { getAllArticlesQuery } from '../src/api-requests/get-articles';
// import { getAllIndustryEventsQuery } from '../src/api-requests/get-industry-events';
// import { getAllArticleSeriesQuery } from '../src/api-requests/get-article-series';
import { getAllPodcastSeriesQuery } from '../src/api-requests/get-podcast-series';
import { getAllFeaturedContentQuery } from '../src/api-requests/get-all-featured';
// import { getAllVideosQuery } from '../src/api-requests/get-videos';
// import { getAllPodcastsQuery } from '../src/api-requests/get-podcasts';
import { getAllVideoSeriesQuery } from '../src/api-requests/get-video-series';
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

interface GQLHandlerInfo {
    contentTypeUID: ContentTypeUID;
    queryName: string;
    mockFile: string;
    getQuery?: (skip?: number, today?: string) => string;
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

export const gqlHandlerInfo: GQLHandlerInfo[] = [
    {
        contentTypeUID: 'content_types',
        queryName: 'get_all_content_types',
        mockFile: 'content-types',
        getQuery: skip => getMetaInfoQuery('content_types', skip),
    },
    {
        contentTypeUID: 'l1_products',
        queryName: 'get_all_l1_products',
        mockFile: 'l-1-products',
        getQuery: skip => getMetaInfoQuery('l1_products', skip),
    },
    {
        contentTypeUID: 'l2_products',
        queryName: 'get_all_l2_products',
        mockFile: 'l-2-products',
        getQuery: skip => getMetaInfoQuery('l2_products', skip),
    },
    {
        contentTypeUID: 'programming_languages',
        queryName: 'get_all_programming_languages',
        mockFile: 'programming-languages',
        getQuery: skip => getMetaInfoQuery('programming_languages', skip),
    },
    {
        contentTypeUID: 'technologies',
        queryName: 'get_all_technologies',
        getQuery: skip => getMetaInfoQuery('technologies', skip),
        mockFile: 'technologies',
    },
    {
        contentTypeUID: 'levels',
        queryName: 'get_all_levels',
        mockFile: 'levels',
        getQuery: skip => getMetaInfoQuery('levels', skip),
    },
    // {
    //     contentTypeUID: 'authors',
    //     queryName: 'get_all_authors',
    //     mockFile: 'authors',
    //     getQuery: skip => getAllAuthorsQuery(skip),
    // },
    // {
    //     contentTypeUID: 'authors',
    //     queryName: 'get_author',
    //     mockFile: 'authors',
    // },
    // {
    //     contentTypeUID: 'articles',
    //     queryName: 'get_all_articles',
    //     mockFile: 'articles',
    //     getQuery: skip => getAllArticlesQuery(skip),
    // },
    // {
    //     contentTypeUID: 'articles',
    //     queryName: 'get_article',
    //     mockFile: 'articles',
    // },
    // {
    //     contentTypeUID: 'industry_events',
    //     queryName: 'get_all_industry_events',
    //     mockFile: 'upcoming-industry-events',
    //     getQuery: skip =>
    //         getAllIndustryEventsQuery(skip, new Date().toISOString()),
    // },
    // {
    //     contentTypeUID: 'article_series',
    //     queryName: 'get_all_article_series',
    //     mockFile: 'article-series',
    //     getQuery: skip => getAllArticleSeriesQuery(),
    // },
    {
        contentTypeUID: 'podcast_series',
        queryName: 'get_all_podcast_series',
        mockFile: 'podcast-series',
        getQuery: skip => getAllPodcastSeriesQuery(),
    },
    {
        contentTypeUID: 'video_series',
        queryName: 'get_all_video_series',
        mockFile: 'video-series',
        getQuery: skip => getAllVideoSeriesQuery(),
    },
    {
        contentTypeUID: 'featured_content',
        queryName: 'get_all_featured_content',
        mockFile: 'featured-content',
        getQuery: skip => getAllFeaturedContentQuery(),
    },
    // {
    //     contentTypeUID: 'videos',
    //     queryName: 'get_all_videos',
    //     mockFile: 'videos',
    //     getQuery: skip => getAllVideosQuery(skip),
    // },
    // {
    //     contentTypeUID: 'podcasts',
    //     queryName: 'get_all_podcasts',
    //     mockFile: 'podcasts',
    //     getQuery: skip => getAllPodcastsQuery(skip),
    // },
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

const gqlHandlers = gqlHandlerInfo.map(
    ({ queryName, mockFile, contentTypeUID }) =>
        graphql.query(queryName, async (req, res, ctx) => {
            console.log(
                `[MSW] GraphQL query "${queryName}" mocked from ${mockFile}.js`
            );
            const params = req.url.searchParams;
            const query = params.get('query');
            if (query?.includes('where: {calculated_slug:')) {
                const calculated_slug = query
                    .split('where: {calculated_slug: "')[1]
                    .split('"')[0];
                let entry;
                let index = 0;
                while (!entry) {
                    const json = (
                        await import(`./data/${mockFile}-${index}.js`)
                    ).default;
                    const items = json.data[`all_${contentTypeUID}`].items;
                    entry = items.find(
                        item => item.calculated_slug === calculated_slug
                    );
                }
                return entry;
            }
            const skip =
                contentTypeUID == 'podcast_series' ||
                contentTypeUID == 'video_series' ||
                contentTypeUID == 'article_series'
                    ? 0
                    : Number(query.split('skip: ')[1].split(')')[0]);
            const fileIndex = skip / CS_GRAPHQL_LIMIT;
            // Will have to adjust for getting individual entries.
            const json = (await import(`./data/${mockFile}-${fileIndex}.js`))
                .default;
            return res(ctx.data(json));
        })
);

const handlers = restHandlers.concat(gqlHandlers);

export default handlers;
