import { clientFactory } from '../utils/client-factory';

const {
    CS_GRAPHQL_URL: URL,
    CS_DELIVERY_TOKEN,
    CS_BRANCH,
    CS_DELIVERY_TOKEN_STAGING,
} = process.env;

const CS_URL = `${URL}?environment=production`;
const CS_HEADERS = {
    access_token: CS_DELIVERY_TOKEN as string,
    branch: CS_BRANCH as string,
    'content-type': 'application/json',
};

const CS_URL_STAGING = `${URL}?environment=staging`;
const CS_HEADERS_STAGING = {
    access_token: CS_DELIVERY_TOKEN_STAGING as string,
    branch: CS_BRANCH as string,
    'content-type': 'application/json',
};

export const CS_CLIENT_PROD = clientFactory(
    'ApolloGraphQL',
    CS_URL,
    CS_HEADERS
);
export const CS_CLIENT_STAGING = clientFactory(
    'ApolloGraphQL',
    CS_URL_STAGING,
    CS_HEADERS_STAGING
);
export const CS_CLIENT_MOCK = clientFactory('Mock', CS_URL, CS_HEADERS);
