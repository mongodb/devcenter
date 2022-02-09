import { ApolloQueryResult, gql } from '@apollo/client';
import fetch from 'node-fetch';

import { UnderlyingClient } from '../types/client-factory';
import { Article } from '../interfaces/article';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
export const getArticlesApollo = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/articles") {
                name
                description
                slug
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};

const getArticles = async (): Promise<Article[]> => {
    const articlesResponse = await fetch(
        `${process.env.API_GATEWAY_URL}/build/articles`
    );
    if (articlesResponse.status != 200) {
        throw Error(`Received ${articlesResponse.status} response from API.`);
    }
    const { articles } = (await articlesResponse.json()) as {
        articles: Article[];
    };
    return articles;
};

export default getArticles;
