import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloQueryResult,
    gql,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { Article } from '../interfaces/article';

class ApolloGraphQLClient {
    _client: ApolloClient<NormalizedCacheObject>;

    constructor() {
        this._client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: `${process.env.STRAPI_URL}/graphql`,
        });
    }
}
class ApolloRestClient {
    _client: ApolloClient<NormalizedCacheObject>;

    constructor() {
        this._client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new RestLink({ uri: process.env.STRAPI_URL }),
        });
    }

    getArticles = async (): Promise<Article[]> => {
        const { data }: ApolloQueryResult<{ articles: Article[] }> =
            await this._client.query({
                query: gql`
                    query Articles {
                        articles @rest(type: "Article", path: "/articles") {
                            name
                            description
                            slug
                        }
                    }
                `,
            });
        return data.articles;
    };
}

export { ApolloGraphQLClient, ApolloRestClient };
