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

export const CS_CLIENT_STAGING = clientFactory(
    'ApolloGraphQL',
    CS_URL_STAGING,
    CS_HEADERS_STAGING
);
const useMock = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

const PROD_CLIENT_NAME = useMock ? 'Mock' : 'ApolloGraphQL';

export const CS_CLIENT = clientFactory(PROD_CLIENT_NAME, CS_URL, CS_HEADERS);
