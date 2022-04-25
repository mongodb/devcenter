import { clientFactory } from '../utils/client-factory';

export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    'http://54.219.161.14:1337'
);
