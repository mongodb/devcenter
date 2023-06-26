import { ApolloQueryResult } from '@apollo/client';
import { DocumentNode } from 'graphql';
import {
    CS_CLIENT_MOCK,
    CS_CLIENT_PROD,
    CS_CLIENT_STAGING,
} from '../config/api-client';
import { ContentTypeUID } from '../interfaces/meta-info';
import { UnderlyingClient } from '../types/client-factory';

// export type gqlParents =
//     | 'l1Products'
//     | 'l2Products'
//     | 'programmingLanguages'
//     | 'spokenLanguages'
//     | 'technologies'
//     | 'contentTypes'
//     | 'levels'
//     | 'articleSeries'
//     | 'articles'
//     | 'authors'
//     | 'authorTypes'
//     | 'industryEvents'
//     | 'podcastSeries'
//     | 'podcasts'
//     | 'videoSeries'
//     | 'videos'
//     | 'featuredContent';

type environment = 'production' | 'staging';

export const getClient = (environment: environment) => {
    const useMock = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

    if (useMock) return CS_CLIENT_MOCK;
    if (environment === 'staging') return CS_CLIENT_STAGING;
    return CS_CLIENT_PROD;
};

/**
 * Helper function to overcome Contentstack's pagination limit.
 * Expects query to have a total and will not fetch anything otherwise.
 */
export const fetchAll = async (
    query: DocumentNode,
    gqlParentName: ContentTypeUID,
    client: UnderlyingClient<'ApolloGraphQL'>,
    variables?: Record<string, any>
) => {
    // expect all incoming cs_query already has total
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables,
    });

    const { total } = response.data[gqlParentName];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        const variablesWithSkip = { ...variables, skip: allItems.length };
        const res: ApolloQueryResult<any> = await client.query({
            query,
            variables: variablesWithSkip,
        });
        const { items } = res.data[gqlParentName];

        allItems.push(...items);
    }

    return allItems;
};

/**
 * modified fetchAll() to store data with skip for updating mock.
 */
export const fetchAllForMocks = async (
    query: DocumentNode,
    gqlParentName: ContentTypeUID,
    variables?: Record<string, any>
) => {
    const client = CS_CLIENT_PROD;
    const mockData: Record<number, any> = {};

    // retrieve total and assume total field is included in the query
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables,
    });
    const { total } = response.data[gqlParentName];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        const skip = allItems.length;
        const variablesWithSkip = { ...variables, skip };
        const { data }: any = await client.query({
            query,
            variables: variablesWithSkip,
        });
        const { items } = data[gqlParentName];

        allItems.push(...items);
        mockData[skip] = { ...data };
    }

    return mockData;
};
