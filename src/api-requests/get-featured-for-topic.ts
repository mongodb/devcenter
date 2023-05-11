import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';
import {
    CS_FeaturedContentResponse,
    FeaturedResponse,
} from '../interfaces/featured';
import { CS_HEADERS } from '../data/constants';
import axios from 'axios';

export const getFeaturedForTopicFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    topicSlug: string
): Promise<FeaturedResponse> => {
    const query = gql`
        query Featured {
            featured @rest(type: "Featured", path: "/featured-content/${encodeURIComponent(
                topicSlug
            )}") {
                articles: new_articles {
                    title: name
                }
                podcasts: podcasts {
                    title
                }
                videos: new_videos {
                    title
                }
                events: events {
                    title
                }
            }
        }
    `;

    const { data }: ApolloQueryResult<{ featured: FeaturedResponse }> =
        await client.query({ query });
    console.log(data);

    return data.featured;
};

const CS_featuredContentFields = `
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

export const getAllFeaturedContent = () => `
    query get_featured {
        all_featured_content  {
            items {
                ${CS_featuredContentFields}
            }
        }
    }
`;

export const getFeaturedForTopic = (topicSlug: string) => `        
    query get_featured {
        all_featured_content(
            where: {category: {MATCH: ANY, 
            content_types: {calculated_slug: "${topicSlug}"}, 
            l1_products: {calculated_slug: "${topicSlug}"}, 
            programming_languages: {calculated_slug: "${topicSlug}"}, 
            technologies: {calculated_slug: "${topicSlug}"}}}
        ) {
            items {
                ${CS_featuredContentFields}
            }
        }
    }
`;

export const CS_getAllFeaturedContent = async (): Promise<
    CS_FeaturedContentResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllFeaturedContent()}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_featured_content;
    return items;
};
