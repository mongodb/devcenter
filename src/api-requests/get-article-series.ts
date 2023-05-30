import { CS_HEADERS } from '../data/constants';
import axios from 'axios';
import { CS_SeriesResponse } from '../interfaces/series';

export const getAllArticleSeriesQuery = () => `
    query get_article_series {
      all_article_series {
        items {
          series_entryConnection {
            edges {
              node {
                ... on Articles {
                  title
                  calculated_slug
                }
              }
            }
          }
          title
        }
      }
    }
`;

export const CS_getAllArticleSeriesFromAPI = async (): Promise<
    CS_SeriesResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllArticleSeriesQuery()}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_article_series;
    return items;
};
