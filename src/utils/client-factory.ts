import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    DefaultOptions,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { ClientType, UnderlyingClient } from '../types/client-factory';
import { RetryLink } from '@apollo/client/link/retry';

/**
 * Returns a client instance used to make external requests.
 * @param client -  The type of client to create.
 * @param uri - The URI that the client will use to connect to the data source.
 */
const clientFactory = <T extends ClientType>(
    clientType: T,
    uri: string | undefined
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

    switch (clientType) {
        case 'ApolloREST':
            return new ApolloClient({
                cache: new InMemoryCache(),
                defaultOptions: defaultOptions,
                //link: new RestLink({ uri }),
                link: ApolloLink.from([
                    // ordering is important
                    new RetryLink(),
                    new RestLink({ uri }),
                ]),
            }) as UnderlyingClient<T>;

        case 'ApolloGraphQL':
            return new ApolloClient({
                cache: new InMemoryCache(),
                uri,
            }) as UnderlyingClient<T>;
        default:
            throw Error('Invalid client type.');
    }
};

export { clientFactory };
