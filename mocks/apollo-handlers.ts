const fs = require('fs');
const path = require('path');
import { ApolloLink, Observable } from '@apollo/client';

import { queryInfos } from '../mocks/update-apollo-mocks';

const mapToContentTypeUID = (operationName: string) => {
    for (const { supportedOperations, contentTypeUID } of queryInfos) {
        if (supportedOperations.includes(operationName)) {
            return contentTypeUID;
        }
    }

    throw new Error(`${operationName} is not supported.`);
};

// note this in theory can return more than one items
// although unlikely given that slug should be unique
const findByMatch = (
    data: Record<string, any>,
    resourceName: string,
    matchFunc: any
) => {
    const foundItems: Record<string, any>[] = [];
    let __typename = '';

    for (const [, resourceData] of Object.entries(data)) {
        const items: Record<string, any>[] = resourceData[resourceName].items;
        __typename = resourceData[resourceName].__typename;
        const foundItem = items.find(matchFunc);

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

    if (!data) {
        return null;
    }

    const { slug, calculatedSlug } = variables;
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
        return new Observable(observer => {
            observer.next({ data });
            observer.complete();
        });
    }

    return forward(operation);
});
