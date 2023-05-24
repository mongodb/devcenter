import { CS_SeriesResponse } from '../interfaces/series';
import axios from 'axios';
import { CS_HEADERS } from '../data/constants';

export const getAllVideoSeriesQuery = () => `
    query get_video_series {
      all_video_series {
        items {
          series_entryConnection {
            edges {
              node {
                ... on Videos {
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

export const CS_getAllVideoSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllVideoSeriesQuery()}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_video_series;
    return items;
};
