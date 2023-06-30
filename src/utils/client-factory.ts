import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client';
import fetch from 'cross-fetch';
import { mockLink } from '../../mocks/apollo-handlers';
import { ClientType, UnderlyingClient } from '../types/client-factory';
/**
 * Returns a client instance used to make external requests.
 * @param client -  The type of client to create.
 * @param uri - The URI that the client will use to connect to the data source.
 */
const clientFactory = <T extends ClientType>(
    clientType: T,
    uri: string | undefined,
    headers?: Record<string, string>
): UnderlyingClient<T> => {
    switch (clientType) {
        case 'ApolloGraphQL':
            return new ApolloClient({
                // https://www.apollographql.com/docs/react/performance/server-side-rendering#initializing-apollo-client
                ssrMode: true, // prevents ApolloClient from refetching queries unnecessarily
                cache: new InMemoryCache(),
                link:
                    // https://www.apollographql.com/docs/react/networking/advanced-http-networking/#overriding-options
                    new HttpLink({
                        uri,
                        headers,
                        fetch,
                    }),
            }) as UnderlyingClient<T>;
        case 'Mock':
            return new ApolloClient({
                ssrMode: true,
                cache: new InMemoryCache(),
                link: ApolloLink.from([
                    mockLink,
                    new HttpLink({
                        uri,
                        headers,
                        fetch,
                    }),
                ]),
            }) as UnderlyingClient<T>;
        default:
            throw Error('Invalid client type.');
    }
};

export { clientFactory };
