import { gql, ApolloQueryResult } from '@apollo/client';

import { apolloClientFactory } from '../utils/client-factory';
import { Article } from '../interfaces/article';

export const getArticles = async (): Promise<Article[]> => {
    const client = apolloClientFactory('REST');
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({
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
