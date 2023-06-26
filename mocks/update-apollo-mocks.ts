const fs = require('fs');
const path = require('path');

import { DocumentNode } from 'graphql';
import {
    fetchAllForMocks,
    gqlParents,
} from '../src/api-requests/contentstack_utils';
import { getAllIndustryEventsQuery } from '../src/graphql/industry-events';
import { getAllPodcastsQuery } from '../src/graphql/podcasts';
import { getAllVideosQuery } from '../src/graphql/videos';

interface QueryInfo {
    query: DocumentNode;
    variables?: Record<string, any>;
    resourceName: gqlParents;
    supportedOperations: string[];
}

export const queryInfos: QueryInfo[] = [
    {
        query: getAllPodcastsQuery,
        resourceName: 'podcasts',
        supportedOperations: ['get_podcast', 'get_all_podcasts'],
    },
    {
        query: getAllVideosQuery,
        resourceName: 'videos',
        supportedOperations: ['get_video', 'get_all_videos'],
    },
    {
        query: getAllIndustryEventsQuery,
        variables: { today: new Date().toISOString() },
        resourceName: 'industryEvents',
        supportedOperations: ['get_industry_event', 'get_all_industry_events'],
    },
];

const updateLocalMockData = async () => {
    for (const { query, resourceName, variables } of queryInfos) {
        const mockData = await fetchAllForMocks(query, resourceName, variables);
        const jsonData = JSON.stringify(mockData, null, 2);
        const fileName = `./${resourceName}.json`;
        const filePath = path.join(__dirname, 'apollo-data', fileName);

        try {
            fs.writeFileSync(filePath, jsonData, { flag: 'w' });
            console.log(`Successfully wrote to ${filePath}`);
        } catch (err) {
            console.error(`Failed to write to ${filePath}`, err);
        }
    }
};

updateLocalMockData();
