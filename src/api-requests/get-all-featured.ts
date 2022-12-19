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
