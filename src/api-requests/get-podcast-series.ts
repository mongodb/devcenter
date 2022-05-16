import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { SeriesResponse } from '../types/series-type';

export const getAllPodcastSeriesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<SeriesResponse[]> => {
    const query = gql`
        query PodcastSeries {
            podcastSeries
                @rest(type: "PodcastSeries", path: "/podcast-series") {
                title
                seriesEntry {
                    podcast {
                        title
                        calculatedSlug: slug
                    }
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ podcastSeries: SeriesResponse[] }> =
        await client.query({ query });

    return data.podcastSeries;
};
