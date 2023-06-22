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
    if (process.env.NODE_ENV === 'development') {
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
    vars?: Record<string, any>
) => {
    const client = get_client();
    // expect all incoming cs_query already has total
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables: vars,
    });

    const { total } = response.data[gqlParentName];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        const variables = { ...vars, skip: allItems.length };
        const res: ApolloQueryResult<any> = await client.query({
            query,
            variables,
        });
        const { items } = res.data[gqlParentName];

        allItems.push(...items);
    }

    return allItems;
};

const storeResponsesForMock = (
    response: ApolloQueryResult<any>,
    responsesContainer: Record<number, any>,
    variables?: Record<string, any>
) => {
    const skip = variables?.skip ?? 0;

    responsesContainer[skip] = {
        response,
    };
};

/**
 * fetchAll() with query and variables stored for updating mock.
 */
export const fetchAllForMocks = async (
    query: DocumentNode,
    gqlParentName: gqlParents,
    variables?: Record<string, any>
) => {
    const client = CS_CLIENT;
    const responsesContainer: Record<number, any> = {};

    // retrieve total and assume total field is included in the query
    const response: ApolloQueryResult<any> = await client.query({
        query,
        variables,
    });
    const { total } = response.data[gqlParentName];

    const allItems: Record<string, any>[] = [];

    while (allItems.length < total) {
        variables = { ...variables, skip: allItems.length };
        const res: any = await client.query({ query, variables });
        const { items } = res.data[gqlParentName];

        allItems.push(...items);
        storeResponsesForMock(response, responsesContainer, variables);
    }

    return responsesContainer;
};
