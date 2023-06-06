import { CS_SeriesResponse } from '../interfaces/series';
import axios from 'axios';
import { CS_HEADERS } from '../data/constants';

export const getAllPodcastSeriesQuery = () => `
    query get_all_podcast_series {
      all_podcast_series {
        total
        items {
          series_entryConnection {
            edges {
              node {
                ... on Podcasts {
                  title
                  calculated_slug : slug
                }
              }
            }
          }
          title
        }
      }
    }
`;

export const CS_getAllPodcastSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllPodcastSeriesQuery()}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_podcast_series;
    return items;
};
