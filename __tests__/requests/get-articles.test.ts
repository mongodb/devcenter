import { gql } from '@apollo/client';

import getArticles, {
    getArticlesApollo,
} from '../../src/requests/get-articles';
import { Article } from '../../src/interfaces/article';

// Mocks
import * as clientFactoryModule from '../../src/utils/client-factory';
import fetch, { Response } from 'node-fetch';

const expectedQuery = gql`
    query Articles {
        articles @rest(type: "Article", path: "/articles") {
            name
            description
            slug
        }
    }
`;

const mockArticlesResponse: { articles: Article[] } = {
    articles: [
        { name: 'Test 1', description: 'Test description 1', slug: 'test-1' },
        { name: 'Test 2', description: 'Test description 2', slug: 'test-2' },
    ],
};

test('constructs the correct query for Apollo request', async () => {
    jest.spyOn(clientFactoryModule, 'clientFactory').mockImplementation(
        // @ts-ignore
        (clientType, uri) => ({
            query: jest.fn(() => ({ data: { articles: [] } })),
        })
    );
    const client = clientFactoryModule.clientFactory('ApolloREST', '');
    await getArticlesApollo(client);
    expect(client.query).toBeCalledWith({ query: expectedQuery });
});

test('throws error on non-200 response', () => {
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response({}, (status = 401))));
    expect(getArticles()).rejects.toThrow('Received 401');
});

test('returns correct articles object on 200 response', async () => {
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response(mockArticlesResponse)));
    expect(getArticles()).resolves.toEqual(mockArticlesResponse.articles);
});
