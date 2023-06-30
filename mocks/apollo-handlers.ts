import fs from 'fs';
import path from 'path';

import { ApolloLink, Observable } from '@apollo/client';

import { ContentTypeUID } from '../src/interfaces/meta-info';

import { DocumentNode } from 'graphql';

import { getAllArticleSeriesQuery } from '../src/graphql/article-series';
import { getAllArticlesQuery } from '../src/graphql/articles';
import { getAllAuthorsQuery } from '../src/graphql/authors';
import { getAllFeaturedContentQuery } from '../src/graphql/featured-content';
import { getAllIndustryEventsQuery } from '../src/graphql/industry-events';
import {
    getAllAuthorTypesQuery,
    getAllContentTypesQuery,
    getAllL1ProductsQuery,
    getAllL2ProductsQuery,
    getAllLevelsQuery,
    getAllProgrammingLanguagesQuery,
    getAllSpokenLanguagesQuery,
    getAllTechnologiesQuery,
} from '../src/graphql/meta-info';
import { getAllPodcastSeriesQuery } from '../src/graphql/podcast-series';
import { getAllPodcastsQuery } from '../src/graphql/podcasts';
import { getAllVideoSeriesQuery } from '../src/graphql/video-series';
import { getAllVideosQuery } from '../src/graphql/videos';

interface QueryInfo {
    query: DocumentNode;
    variables?: Record<string, any>;
    contentTypeUID: ContentTypeUID;
    supportedOperations: string[];
}

export const queryInfos: QueryInfo[] = [
    {
        query: getAllArticleSeriesQuery,
        contentTypeUID: 'article_series',
        supportedOperations: ['get_all_article_series'],
    },
    {
        query: getAllArticlesQuery,
        contentTypeUID: 'articles',
        supportedOperations: ['get_article', 'get_all_articles'],
    },
    {
        query: getAllAuthorTypesQuery,
        contentTypeUID: 'author_types',
        supportedOperations: ['get_all_author_types'],
    },
    {
        query: getAllAuthorsQuery,
        contentTypeUID: 'authors',
        supportedOperations: ['get_author', 'get_all_authors'],
    },
    {
        query: getAllContentTypesQuery,
        contentTypeUID: 'content_types',
        supportedOperations: ['get_all_content_types'],
    },
    {
        query: getAllLevelsQuery,
        contentTypeUID: 'levels',
        supportedOperations: ['get_all_levels'],
    },
    {
        query: getAllFeaturedContentQuery,
        contentTypeUID: 'featured_content',
        supportedOperations: ['get_all_featured_content'],
    },
    {
        query: getAllIndustryEventsQuery,
        variables: { today: new Date().toISOString() },
        contentTypeUID: 'industry_events',
        supportedOperations: ['get_industry_event', 'get_all_industry_events'],
    },
    {
        query: getAllL1ProductsQuery,
        contentTypeUID: 'l1_products',
        supportedOperations: ['get_all_l1_products'],
    },
    {
        query: getAllL2ProductsQuery,
        contentTypeUID: 'l2_products',
        supportedOperations: ['get_all_l2_products'],
    },
    {
        query: getAllPodcastSeriesQuery,
        contentTypeUID: 'podcast_series',
        supportedOperations: ['get_all_podcast_series'],
    },
    {
        query: getAllPodcastsQuery,
        contentTypeUID: 'podcasts',
        supportedOperations: ['get_podcast', 'get_all_podcasts'],
    },
    {
        query: getAllProgrammingLanguagesQuery,
        contentTypeUID: 'programming_languages',
        supportedOperations: ['get_all_programming_languages'],
    },
    {
        query: getAllSpokenLanguagesQuery,
        contentTypeUID: 'spoken_languages',
        supportedOperations: ['get_all_spoken_languages'],
    },
    {
        query: getAllTechnologiesQuery,
        contentTypeUID: 'technologies',
        supportedOperations: ['get_all_technologies'],
    },
    {
        query: getAllVideoSeriesQuery,
        contentTypeUID: 'video_series',
        supportedOperations: ['get_all_video_series'],
    },
    {
        query: getAllVideosQuery,
        contentTypeUID: 'videos',
        supportedOperations: ['get_video', 'get_all_videos'],
    },
];

const mapToContentTypeUID = (operationName: string) => {
    for (const { supportedOperations, contentTypeUID } of queryInfos) {
        if (supportedOperations.includes(operationName)) {
            return contentTypeUID;
        }
    }

    throw new Error(`${operationName} is not supported.`);
};

const get__typename = (contentTypeUID: ContentTypeUID) => {
    const words = ['all'];
    words.push(...contentTypeUID.split('_'));

    for (const [idx, word] of words.entries()) {
        words[idx] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join('');
};

const formatForApollo = (
    contentTypeUID: ContentTypeUID,
    foundItems: Record<string, any>[]
) => {
    const formatted: Record<string, any> = {};
    formatted[contentTypeUID] = {
        __typename: get__typename(contentTypeUID),
        total: foundItems.length,
        items: foundItems,
    };

    return formatted;
};

// note this in theory can return more than one items
// although unlikely given that slug should be unique
const findByMatch = (
    data: Record<string, any>,
    contentTypeUID: ContentTypeUID,
    matchFunc: any
) => {
    const foundItems: Record<string, any>[] = [];

    for (const [, resourceData] of Object.entries(data)) {
        const items: Record<string, any>[] = resourceData[contentTypeUID].items;
        const foundItem = items.find(matchFunc);

        if (!foundItem) continue;
        foundItems.push(foundItem);
    }

    return formatForApollo(contentTypeUID, foundItems);
};

const loadMockData = (
    operationName: string,
    variables: Record<string, any>
) => {
    const contentTypeUID = mapToContentTypeUID(operationName);
    const fileName = `${contentTypeUID}.json`;
    const filePath = path.join(process.cwd(), 'mocks', 'apollo-data', fileName);
    let data: any = null;

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error deserializing JSON file at ${filePath}, ${error}`);
        throw error;
    }

    // handle for {}, which is currently the case
    // for video_series and podcast_series
    const hasMockButMockIsEmpty = Object.keys(data).length === 0;
    if (hasMockButMockIsEmpty) return formatForApollo(contentTypeUID, []);

    const { slug, calculatedSlug, topicSlug } = variables;
    let skip = variables.skip;

    if (slug) {
        return findByMatch(
            data,
            contentTypeUID,
            (item: { slug: string }) => item.slug === slug
        );
    }

    if (calculatedSlug) {
        return findByMatch(
            data,
            contentTypeUID,
            (item: { calculated_slug: string }) =>
                item.calculated_slug === calculatedSlug
        );
    }

    if (topicSlug) {
        return findByMatch(data, contentTypeUID, (item: any) => {
            const matchContentType = item.categoryConnection.edges.some(
                (edge: any) => edge.node.calculated_slug === topicSlug
            );
            const matchIndustryEvent =
                item.industry_eventsConnection.edges.some(
                    (edge: any) => edge.node.calculated_slug === topicSlug
                );
            const matchPodcast = item.podcastsConnection.edges.some(
                (edge: any) => edge.node.calculated_slug === topicSlug
            );
            const matchArticle = item.articlesConnection.edges.some(
                (edge: any) => edge.node.calculated_slug === topicSlug
            );

            return (
                matchContentType ||
                matchIndustryEvent ||
                matchPodcast ||
                matchArticle
            );
        });
    }

    if (!skip) skip = 0;

    return data[skip.toString()];
};

// mockLink intercept gql query made by apolloclient
// mockLink is used before the final HTTPLink
// when creating the mock ApolloClient
export const mockLink = new ApolloLink((operation, forward) => {
    const { operationName, variables } = operation;
    const data: any = loadMockData(operationName, variables);

    if (data) {
        console.log(`${operationName} is mocked from local data`);
        return new Observable(observer => {
            observer.next({ data });
            observer.complete();
        });
    }

    console.log(`${operationName} is uncaught and forwarded for HTTP requests`);
    return forward(operation);
});
