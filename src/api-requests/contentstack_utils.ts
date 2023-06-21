import { DocumentNode } from 'graphql';
import { CS_CLIENT, MOCK_CS_CLIENT } from '../config/api-client';

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
    vars?: { [key: string]: any }
) => {
    const client = get_client();
    // expect all incoming cs_query already has total
    const response: any = await client.query({ query, variables: vars });
    storeMockResponse(query, vars, response);

    const { total } = response.data[gqlParentName];

    let allItems: { [key: string]: any }[] = [];

    while (allItems.length < total) {
        const variables = { ...vars, skip: allItems.length };
        const res: any = await client.query({ query, variables });
        storeMockResponse(query, variables, response);
        const { items } = res.data[gqlParentName];

        allItems = allItems.concat(items);
    }

    return allItems;
};

const storeMockResponse = (
    query: any,
    variables: any,
    response: any
    // mockDataObj?: Record<string, any>
) => {
    const queryName = (query as any).definitions[0].name.value;
    const { slug, skip } = variables;
    const mock: any = {};

    mock[queryName] = {
        variables,
        response,
    };

    console.log(`slug=${slug}, skip=${skip}`);

    console.log('[JW DEBUG] mock', mock);
};

/**
 * fetchAll() with query and variables stored for updating mock.
 */
export const fetchAllForMocks = async (
    query: DocumentNode,
    gqlParentName: gqlParents,
    vars?: { [key: string]: any }
) => {
    const client = CS_CLIENT;
    const mockData: Record<string, any> = {};

    // expect all incoming cs_query already has total
    const response: any = await client.query({ query, variables: vars });
    storeMockResponse(query, vars, response, mockData);

    const { total } = response.data[gqlParentName];

    let allItems: { [key: string]: any }[] = [];

    while (allItems.length < total) {
        const variables = { ...vars, skip: allItems.length };
        const res: any = await client.query({ query, variables });
        storeMockResponse(query, vars, response, mockData);

        // console.log('[JW DEBUG] res', res);
        // console.log('[JW DEBUG] query', query.definitions[0].name.value);
        // console.log('[JW DEBUG] variables', variables);

        const { items } = res.data[gqlParentName];

        allItems = allItems.concat(items);
    }

    return mockData;
};
