import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { Article } from '../interfaces/article';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
export const getArticles = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/articles") {
                title: name
                description
                slug
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};

export const getAllArticlesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/new-articles?_publicationState=preview&_limit=-1") {
                authors {
                    name
                    bio
                    image {
                        url
                    }
                }
                description
                content
                slug
                image {
                    url
                }
                title: name
                publishDate: published_at
                originalPublishDate
                updateDate: updatedAt
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};
