import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Article } from '../interfaces/article';
import getArticles from './get-articles';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllPodcasts = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Podcasts[]> => {
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

export default getAllPodcasts;
