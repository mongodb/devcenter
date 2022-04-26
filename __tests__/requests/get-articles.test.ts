import { gql } from '@apollo/client';

import getArticles from '../../src/api-requests/get-articles';
import * as clientFactoryModule from '../../src/utils/client-factory';

const expectedQuery = gql`
    query Articles {
        articles @rest(type: "Article", path: "/articles") {
            name
            description
            slug
        }
    }
`;

test('constructs the correct query', async () => {
    jest.spyOn(clientFactoryModule, 'clientFactory').mockImplementation(
        // @ts-ignore
        (clientType, uri) => ({
            query: jest.fn(() => ({ data: { articles: [] } })),
        })
    );
    const client = clientFactoryModule.clientFactory('ApolloREST', '');
    await getArticles(client);
    expect(client.query).toBeCalledWith({ query: expectedQuery });
});
