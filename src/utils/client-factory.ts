import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    DefaultOptions,
    HttpLink,
    // Observable,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { ClientType, UnderlyingClient } from '../types/client-factory';
import { RetryLink } from '@apollo/client/link/retry';

const mockLink = new ApolloLink((operation, forward) => {
    // const {
    //     operationName,
    //     variables: { skip, slug },
    // } = operation;

    // console.log('[JW DEBUG] operationName', operationName);
    // console.log('[JW DEBUG] skip', skip);
    // console.log('[JW DEBUG] slug', slug);

    // const skip = variables.skip

    // return new Observable(() => {});
    return forward(operation);
});

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
                        // log uri (on dev mode) and fetch
                        fetch: (...pl) => {
                            if (process.env.NODE_ENV === 'production') {
                                return fetch(...pl);
                            }

                            // https://github.com/apollographql/apollo-client/issues/4017
                            // tweaked from musemind implementation

                            // Uncomment below if we want to see outbound gql uri
                            // const [uri] = pl;
                            // console.log(uri)

                            // because queries are long,
                            // so save them locally instead of logging to console
                            return fetch(...pl);
                        },
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
