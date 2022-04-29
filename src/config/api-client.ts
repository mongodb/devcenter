import { clientFactory } from '../utils/client-factory';

export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    'http://54.219.137.111:1337'
);
