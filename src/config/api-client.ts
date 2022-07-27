import { clientFactory } from '../utils/client-factory';

export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    process.env.STRAPI_URL_TEST
);
