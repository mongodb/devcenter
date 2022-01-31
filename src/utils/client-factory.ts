import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

type ApolloClientType = 'REST' | 'GraphQL';

const apolloClientFactory = (
    clientType: ApolloClientType
): ApolloClient<NormalizedCacheObject> => {
    switch (clientType) {
        case 'REST':
            return new ApolloClient({
                cache: new InMemoryCache(),
                link: new RestLink({ uri: process.env.STRAPI_URL }),
            });
        case 'GraphQL':
            return new ApolloClient({
                cache: new InMemoryCache(),
                uri: `${process.env.STRAPI_URL}/graphql`,
            });
    }
};

export { apolloClientFactory };
