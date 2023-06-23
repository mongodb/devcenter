const fs = require('fs');
const path = require('path');
import { ApolloLink, Observable } from '@apollo/client';

const mapToMockResources = (queryName: string) => {
    const queryToResources: Record<string, string> = {
        get_podcast: 'podcasts',
        get_all_podcasts: 'podcasts',
        get_video: 'videos',
        get_all_videos: 'videos',
    };

    return queryToResources[queryName];
};

// note this in theory can return more than one items
// although unlikely given that slug should be unique
const findBySlug = (
    data: Record<string, any>,
    resourceName: string,
    slug: string
) => {
    const foundItems: Record<string, any>[] = [];
    let __typename = '';

    for (const [, resourceData] of Object.entries(data)) {
        const items: Record<string, any>[] = resourceData[resourceName].items;
        __typename = resourceData[resourceName].__typename;
        const foundItem = items.find(item => item.slug === slug);

        if (!foundItem) continue;
        foundItems.push(foundItem);
    }

    const formatted: Record<string, any> = {};
    formatted[resourceName] = {
        __typename,
        total: foundItems.length,
        items: foundItems,
    };

    return formatted;
};

const loadMockData = (operationName: string, skip: number, slug: string) => {
    const resourceName = mapToMockResources(operationName);
    const fileName = `${resourceName}.json`;
    const filePath = path.join(process.cwd(), 'mocks', 'apollo-data', fileName);
    let data: any = null;

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
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

    return data[skip.toString()];
};

// mockLink intercept gql query made by apolloclient
// mockLink is used before the final HTTPLink
// when creating the mock ApolloClient
export const mockLink = new ApolloLink((operation, forward) => {
    const {
        operationName,
        variables: { skip, slug },
    } = operation;

    const data: any = loadMockData(operationName, skip, slug);

    if (data) {
        return new Observable(observer => {
            observer.next({ data });
            observer.complete();
        });
    }

    return forward(operation);
});
