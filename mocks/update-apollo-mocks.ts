import { DocumentNode } from 'graphql';
import {
    fetchAllForMocks,
    gqlParents,
} from '../src/api-requests/contentstack_utils';
import { allPodcastsQuery } from '../src/graphql/podcasts';
import { writeFileSync } from 'fs';
import path from 'path';

interface QueryInfo {
    query: DocumentNode;
    gqlParentName: gqlParents;
}

const queryinfos: QueryInfo[] = [
    {
        query: allPodcastsQuery,
        gqlParentName: 'podcasts',
    },
];

const updateLocalMockData = async () => {
    for (const { query, gqlParentName } of queryinfos) {
        const mockData = await fetchAllForMocks(query, gqlParentName);
        const jsonData = JSON.stringify(mockData, null, 2);
        const fileName = `./${gqlParentName}.json`;
        const filePath = path.join(__dirname, 'apollo-data', fileName);

        try {
            writeFileSync(filePath, jsonData, { flag: 'w' });
            console.log(`Successfully wrote to ${filePath}`);
        } catch (err) {
            console.error(`Failed to write to ${filePath}`, err);
        }
    }
};

updateLocalMockData();
