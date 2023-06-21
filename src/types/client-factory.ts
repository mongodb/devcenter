import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export type ApolloClientType = 'ApolloREST' | 'ApolloGraphQL' | 'Mock';
export type ClientType = ApolloClientType; // Update this if we have more client types (e.g. Lambda)

// Basically maps a string client type to the underlying client type so typescript knows what to do.
// Both Apollo clients return the same thing, but this pattern should make this extensible in
// the case of different clients (e.g. Lambda client would correspond to some other client).
export type UnderlyingClient<T extends ClientType> = T extends 'ApolloREST'
    ? ApolloClient<NormalizedCacheObject>
    : T extends 'ApolloGraphQL'
    ? ApolloClient<NormalizedCacheObject>
    : never;
