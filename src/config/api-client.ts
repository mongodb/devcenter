import { clientFactory } from '../utils/client-factory';

export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    process.env.STRAPI_URL
);

export const STRAPI_GQL_CLIENT = clientFactory(
    'ApolloGraphQL',
    `${process.env.STRAPI_URL}/graphql`
);
