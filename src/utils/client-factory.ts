import { ApolloRestClient, ApolloGraphQLClient } from './apollo-client';

type ApolloClientType = 'REST' | 'GraphQL';
type ClientType = ApolloClientType; // Update this if we have more client types (e.g. Lambda)

// Basically maps the param type to the return type so typescript knows what to do.
type ReturnClientType<T extends ClientType> = T extends 'REST'
    ? ApolloRestClient
    : T extends 'GraphQL'
    ? ApolloGraphQLClient
    : never;

const clientFactory = <T extends ClientType>(
    clientType: T
): ReturnClientType<T> => {
    switch (clientType) {
        case 'REST':
            return new ApolloRestClient() as ReturnClientType<T>;
        case 'GraphQL':
            return new ApolloGraphQLClient() as ReturnClientType<T>;
        default:
            throw Error('Invalid client type.');
    }
};

export { clientFactory };
