import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { SeriesResponse } from '../types/series-type';

export const getAllVideoSeriesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<SeriesResponse[]> => {
    const query = gql`
        query VideoSeries {
            videoSeries @rest(type: "VideoSeries", path: "/new-video-series") {
                title
                seriesEntry {
                    video: new_video {
                        title
                        calculatedSlug: slug
                    }
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videoSeries: SeriesResponse[] }> =
        await client.query({ query });

    return data.videoSeries;
};
