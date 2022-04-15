import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Podcast } from '../interfaces/podcast';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllPodcastsFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Podcast[]> => {
    const query = gql`
        query Podcasts {
            podcasts @rest(type: "Podcast", path: "/podcasts") {
                description
                publishDate: originalPublishDate
                title
                slug
                podcastFileUrl
                thumbnailUrl
            }
        }
    `;
    const { data }: ApolloQueryResult<{ podcasts: Podcast[] }> =
        await client.query({ query });

    return data.podcasts;
};

export default getAllPodcastsFromAPI;
