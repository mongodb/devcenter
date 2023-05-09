import { clientFactory } from '../utils/client-factory';

export const STRAPI_CLIENT = clientFactory(
    'ApolloREST',
    process.env.STRAPI_URL
);

const {
    CS_URL: URL,
    CS_STACK_API_KEY,
    CS_ENVIRONMENT,
    CS_ACCESS_TOKEN,
    CS_BRANCH,
} = process.env;

const CS_URL = `${URL}/stacks/${CS_STACK_API_KEY}?environment=${CS_ENVIRONMENT}`;
const CS_HEADERS = {
    access_token: CS_ACCESS_TOKEN as string,
    branch: CS_BRANCH as string,
    'content-type': 'application/json',
};

export const CS_CLIENT = clientFactory('ApolloGraphQL', CS_URL, CS_HEADERS);
