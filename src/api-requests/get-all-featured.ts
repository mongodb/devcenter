import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { FeaturedResponse } from '../interfaces/featured';

export const getAllFeaturedInfoFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<FeaturedResponse[]> => {
    const query = gql`
        query Featured {
            featured @rest(type: "Featured", path: "/featured-content") {
                content
            }
        }
    `;
    const {
        data,
    }: ApolloQueryResult<{ featured: { content: FeaturedResponse[] } }> =
        await client.query({ query });

    return data.featured.content;
};

export const getAllFeaturedFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<FeaturedResponse[]> => {
    const query = gql`
        query Featured {
            featured @rest(type: "Featured", path: "/featured-content") {
                content {
                    articles: new_articles {
                        title: name
                    }
                    podcasts: podcasts {
                        title
                    }
                    videos: new_videos {
                        title
                    }
                }
            }
        }
    `;
    const {
        data,
    }: ApolloQueryResult<{ featured: { content: FeaturedResponse[] } }> =
        await client.query({ query });

    return data.featured.content;
};
