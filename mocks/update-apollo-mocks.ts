import fs from 'fs';
import path from 'path';

import { fetchAllForMocks } from '../src/api-requests/contentstack_utils';
import { queryInfos } from './apollo-handlers';

// currently not applied due to
// frontend is not consistently handling asterisked titles
// const asteriskTitlesForDistinction = (mockData: any) => {
//     if (!mockData) return mockData;

//     if (Array.isArray(mockData)) {
//         mockData = mockData.map(md => asteriskTitlesForDistinction(md));
//     }

//     if (typeof mockData === 'object' && !Array.isArray(mockData)) {
//         if (mockData.hasOwnProperty('title')) {
//             mockData.title = `*${mockData.title}`;
//         }

//         Object.keys(mockData).forEach(key => {
//             mockData[key] = asteriskTitlesForDistinction(mockData[key]);
//         });
//     }

//     return mockData;
// };

const updateLocalMockData = async () => {
    for (const { query, contentTypeUID, variables } of queryInfos) {
        const mockData = await fetchAllForMocks(
            query,
            contentTypeUID,
            variables
        );

        // below is commented out because
        // frontend is not consistently handling asterisked titles
        // so data without asterisks is used for mocking

        // const mockClone = JSON.parse(JSON.stringify(mockData));
        // const modifiedMock = asteriskTitlesForDistinction(mockClone);
        // const jsonData = JSON.stringify(modifiedMock, null, 2);
        const jsonData = JSON.stringify(mockData, null, 2);
        const fileName = `./${contentTypeUID}.json`;
        const filePath = path.join(__dirname, 'apollo-data', fileName);

        try {
            fs.writeFileSync(filePath, jsonData, { flag: 'w' });
            console.log(`Successfully wrote to ${filePath}`);
        } catch (err) {
            console.error(`Failed to write to ${filePath}`, err);
        }
    }
};

if (require.main === module) updateLocalMockData();
