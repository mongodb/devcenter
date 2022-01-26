import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({ uri: process.env.STRAPI_URL });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
});

export default client;
