import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    DefaultOptions,
    HttpLink,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { ClientType, UnderlyingClient } from '../types/client-factory';
import { RetryLink } from '@apollo/client/link/retry';
import { mockLink } from '../../mocks/apollo-handlers';

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
    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    const defaultHeaders = new Headers();
    defaultHeaders.append(
        'Strapi-Token',
        process.env.STRAPI_API_TOKEN as string
    );

    // TODO: revisit if REST should be removed in post-migration
    switch (clientType) {
        case 'ApolloREST':
            return new ApolloClient({
                cache: new InMemoryCache(),
                defaultOptions: defaultOptions,
                //link: new RestLink({ uri }),
                link: ApolloLink.from([
                    // ordering is important
                    new RetryLink(),
                    new RestLink({
                        uri,
                        headers: defaultHeaders,
                    }),
                ]),
            }) as UnderlyingClient<T>;
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
                        fetchOptions: { method: 'GET' }, // override default POST to use GET
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
                        fetchOptions: { method: 'GET' },
                    }),
                ]),
            }) as UnderlyingClient<T>;
        default:
            throw Error('Invalid client type.');
    }
};

export { clientFactory };
