import { DocumentNode } from 'graphql';
import {
    fetchAllForMocks,
    gqlParents,
} from '../src/api-requests/contentstack_utils';
import { allPodcastsQuery } from '../src/graphql/podcasts';
import { writeFileSync } from 'fs';

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

const updateMockToLocal = () => {
    for (const { query, gqlParentName } of queryinfos) {
        const mockData = fetchAllForMocks(query, gqlParentName);
        const jsonData = JSON.stringify(mockData, null, 2);
        const queryName = (query as any).definitions[0].name.value;
        const filePath = `./${queryName}.json`;

        try {
            writeFileSync(filePath, jsonData);
            console.log(`Successfully wrote to ${filePath}`);
        } catch (err) {
            console.error(`Failed to write to ${filePath}`, err);
        }
    }
};

updateMockToLocal();
