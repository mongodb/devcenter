import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { FeaturedResponse } from '../interfaces/featured';

export const getFeaturedForTopicFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    topicSlug: string
): Promise<FeaturedResponse> => {
    const query = gql`
        query Featured {
            featured @rest(type: "Featured", path: "/featured-content/${encodeURIComponent(
                topicSlug
            )}") {
                articles: new_articles {
                    title: name
                }
                podcasts: podcasts {
                    title
                }
                videos: new_videos {
                    title
                }
                events: events {
                    title
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ featured: FeaturedResponse }> =
        await client.query({ query });

    return data.featured;
};
