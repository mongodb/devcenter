import { gql } from '@apollo/client';

import * as clientFactoryModule from '../../src/utils/client-factory';
import { getArticles } from '../../src/api-requests/get-articles';

const expectedQuery = gql`
    query Articles {
        articles @rest(type: "Article", path: "/articles") {
            title: name
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
