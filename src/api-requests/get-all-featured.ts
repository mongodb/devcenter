import {
    CS_FeaturedContentResponse,
    FeaturedResponse,
} from '../interfaces/featured';
import axios from 'axios';
import { CS_HEADERS } from '../data/constants';

export const CS_featuredContentFields = `
      categoryConnection {
        edges {
          node {
            ... on L1Products {
              calculated_slug
            }
            ... on ContentTypes {
              calculated_slug
            }
            ... on ProgrammingLanguages {
              calculated_slug
            }
            ... on Technologies {
              calculated_slug
            }
          }
        }
      }
      industry_eventsConnection(limit: 3) {
        edges {
          node {
            ... on IndustryEvents {
              title
            }
          }
        }
      }
      podcastsConnection(limit: 3) {
        edges {
          node {
            ... on Podcasts {
              title
            }
          }
        }
      }
      videosConnection(limit: 3) {
        edges {
          node {
            ... on Videos {
              title
            }
          }
        }
      }
      articlesConnection(limit: 3) {
        edges {
          node {
            ... on Articles {
              title
            }
          }
        }
      }
`;

export const getAllFeaturedContentQuery = () => `
    query get_featured {
        all_featured_content  {
            total
            items {
                ${CS_featuredContentFields}
            }
        }
    }
`;

export const transformCSFeaturedContentResponse = (
    items: CS_FeaturedContentResponse[]
) => {
    return items.map(item => {
        return {
            articles: item.articlesConnection.edges.map(a => {
                return { title: a.node.title };
            }),
            videos: item.videosConnection.edges.map(v => {
                return { title: v.node.title };
            }),
            podcasts: item.podcastsConnection.edges.map(p => {
                return { title: p.node.title };
            }),
            events: item.industry_eventsConnection.edges.map(i => {
                return { title: i.node.title };
            }),
        } as FeaturedResponse;
    });
};

export const CS_getAllFeaturedContent = async (): Promise<
    FeaturedResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllFeaturedContentQuery()}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_featured_content;
    return transformCSFeaturedContentResponse(items);
};
