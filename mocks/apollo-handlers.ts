import { ApolloLink } from '@apollo/client';
import { readFileSync } from 'fs';
import path from 'path';

const mapToMockResources = (queryName: string) => {
    const queryToResources: Record<string, string> = {
        get_podcast: 'podcasts',
        get_all_podcasts: 'podcasts',
    };

    return queryToResources[queryName];
};

const formatToSlugResponse = (
    items: Record<string, any>[],
    remaining: Record<string, any>,
    resourceName: string
) => {
    if (!items) return [];

    const formattedResponse: Record<string, any> = { ...remaining };
    const __typename = items[0].__typename;

    formattedResponse.data[resourceName] = {
        __typename,
        total: items.length,
        items,
    };

    return formattedResponse;
};

const findBySlug = (
    responsesData: Record<string, any>,
    resourceName: string,
    slug: string
) => {
    const items: Record<string, any>[] = [];

    for (const [, responseData] of Object.entries(responsesData)) {
        const items: Record<string, any>[] =
            responseData.response.data[resourceName].items;
        const item = items.find(item => item.slug === slug);

        if (!item) continue;

        items.push(item);
    }
    const remaining = {};
    console.log(items);

    return formatToSlugResponse(items, remaining, resourceName);
};

const loadMockData = (operationName: string, skip: number, slug: string) => {
    const resourceName = mapToMockResources(operationName);
    const fileName = `${resourceName}.json`;
    const filePath = path.join(process.cwd(), 'mocks', 'apollo-data', fileName);
    let data: any = null;

    try {
        const jsonData = readFileSync(filePath, 'utf-8');
        data = JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error deserializing JSON file at ${filePath}, error`);
    }

    if (!data) {
        return null;
    }

    if (slug) {
        return findBySlug(data, resourceName, slug);
    }

    if (!skip) skip = 0;

    return data[skip];
};

// intercept gql query made by apolloclient
export const mockLink = new ApolloLink((operation, forward) => {
    const {
        operationName,
        variables: { skip, slug },
    } = operation;

    console.log('[JW DEBUG] operationName', operationName);
    console.log('[JW DEBUG] skip', skip);
    console.log('[JW DEBUG] slug', slug);

    const data: any = loadMockData(operationName, skip, slug);

    if (!data) {
        return forward(operation);
    }

    console.log('[JW DEBUG] data', data);
    // const skip = variables.skip

    // return new Observable(() => {});
    return forward(operation);
});
