import { DocumentNode } from 'graphql';
import { CS_CLIENT, MOCK_CS_CLIENT } from '../config/api-client';
import { ApolloQueryResult } from '@apollo/client';

export type gqlParents =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes'
    | 'articleSeries'
    | 'articles'
    | 'authors'
    | 'industryEvents'
    | 'podcastSeries'
    | 'podcasts'
    | 'videoSeries'
    | 'videos';

const get_client = () => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        return MOCK_CS_CLIENT;
    }

    return CS_CLIENT;
};

/**
 * Helper function to overcome Contentstack's pagination limit.
 * Expects query to have a total and will not fetch anything otherwise.
 */
export const fetchAll = async (
    query: DocumentNode,
    gqlParentName: gqlParents,
    variables?: Record<string, any>
) => {
    const client = get_client();
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
    gqlParentName: gqlParents,
    variables?: Record<string, any>
) => {
    const client = CS_CLIENT;
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
