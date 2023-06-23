const fs = require('fs');
const path = require('path');

import { DocumentNode } from 'graphql';
import {
    fetchAllForMocks,
    gqlParents,
} from '../src/api-requests/contentstack_utils';
import { allPodcastsQuery } from '../src/graphql/podcasts';
import { allVideosQuery } from '../src/graphql/videos';

interface QueryInfo {
    query: DocumentNode;
    gqlParentName: gqlParents;
}

const queryinfos: QueryInfo[] = [
    {
        query: allPodcastsQuery,
        gqlParentName: 'podcasts',
    },
    {
        query: allVideosQuery,
        gqlParentName: 'videos',
    },
];

const updateLocalMockData = async () => {
    for (const { query, gqlParentName } of queryinfos) {
        const mockData = await fetchAllForMocks(query, gqlParentName);
        const jsonData = JSON.stringify(mockData, null, 2);
        const fileName = `./${gqlParentName}.json`;
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
