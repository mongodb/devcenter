import { clientFactory } from '../utils/client-factory';

// TODO: Remove in post-migration
// Kept for any strapi-dependencies for now
export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    process.env.STRAPI_URL
);

const { CS_GRAPHQL_URL: URL, CS_DELIVERY_TOKEN, CS_BRANCH } = process.env;

const CS_URL = `${URL}?environment=production`;
const CS_HEADERS = {
    access_token: CS_DELIVERY_TOKEN as string,
    branch: CS_BRANCH as string,
    'content-type': 'application/json',
};

export const CS_CLIENT = clientFactory('ApolloGraphQL', CS_URL, CS_HEADERS);
