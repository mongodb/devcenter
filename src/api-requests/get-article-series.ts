import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import { SeriesResponse } from '../types/series-type';

export const getAllArticleSeriesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<SeriesResponse[]> => {
    const query = gql`
        query ArticleSeries {
            articleSeries
                @rest(type: "ArticleSeries", path: "/new-article-series") {
                title
                seriesEntry {
                    article: new_article {
                        title: name
                        calculatedSlug: calculated_slug
                    }
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articleSeries: SeriesResponse[] }> =
        await client.query({ query });

    return data.articleSeries;
};
