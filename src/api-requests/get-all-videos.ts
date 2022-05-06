import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Video } from '../interfaces/video';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllVideosFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Video[]> => {
    const query = gql`
        query Videos {
            videos @rest(type: "Video", path: "/new-videos") {
                description
                publishDate: originalPublishDate
                title
                slug
                videoId
                thumbnailUrl
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videos: Video[] }> = await client.query(
        { query }
    );

    return data.videos;
};

export default getAllVideosFromAPI;
