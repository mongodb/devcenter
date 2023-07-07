import { ApolloQueryResult } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { CS_CLIENT, CS_CLIENT_STAGING } from '../config/api-client';
import { ContentTypeUID } from '../interfaces/meta-info';
import { UnderlyingClient } from '../types/client-factory';
import { FetchPolicy } from '@apollo/client/core';

type environment = 'production' | 'staging';

export const getClient = (environment: environment) =>
    environment === 'staging' ? CS_CLIENT_STAGING : CS_CLIENT;

/**
 * Helper function to overcome Contentstack's pagination limit.
 * Expects query to have a total and will not fetch anything otherwise.
 */
export const fetchAll = async (
    query: DocumentNode,
    contentTypeUID: ContentTypeUID,
    client: UnderlyingClient<'ApolloGraphQL'>,
    variables?: Record<string, any>,
    fetchPolicy: FetchPolicy = 'cache-first'
) => {
    // expect all incoming cs_query already has total
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables,
        fetchPolicy,
    });

    const { total } = response.data[contentTypeUID];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        const variablesWithSkip = { ...variables, skip: allItems.length };
        const res: ApolloQueryResult<any> = await client.query({
            query,
            variables: variablesWithSkip,
            fetchPolicy,
        });
        const { items } = res.data[contentTypeUID];

        allItems.push(...items);
    }

    return allItems;
};

/**
 * modified fetchAll() to store data with skip for updating mock.
 */
export const fetchAllForMocks = async (
    query: DocumentNode,
    contentTypeUID: ContentTypeUID,
    variables?: Record<string, any>
) => {
    const client = CS_CLIENT;
    const mockData: Record<number, any> = {};

    // retrieve total and assume total field is included in the query
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables,
    });
    const { total } = response.data[contentTypeUID];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        const skip = allItems.length;
        const variablesWithSkip = { ...variables, skip };
        const { data }: any = await client.query({
            query,
            variables: variablesWithSkip,
        });
        const { items } = data[contentTypeUID];

        allItems.push(...items);
        mockData[skip] = { ...data };
    }

    return mockData;
};
