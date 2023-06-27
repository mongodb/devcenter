const fs = require('fs');
const path = require('path');
import { ApolloLink, Observable } from '@apollo/client';

import { queryInfos } from '../mocks/update-apollo-mocks';
import { ContentTypeUID } from '../src/interfaces/meta-info';

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
