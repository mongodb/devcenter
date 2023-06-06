import { CS_IndustryEventsResponse } from '../interfaces/event';
import {
    CS_GRAPHQL_LIMIT,
    CS_HEADERS,
    CS_STAGING_HEADERS,
} from '../data/constants';
import axios from 'axios';

export const CS_industryEventsFields = `
    type
    authorsConnection(limit: 5) {
      edges {
        node {
          ... on Authors {
            title
            imageConnection{
              edges {
                node {
                  url
                }
              }
            }
            bio
            calculated_slug
            twitter
            job_title
          }
        }
      }
    }
    address {
        address_line_1
        address_line_2
        city
        coordinates
        country
        location
        preferred_location
        state
        zipcode
    }
    content
    title
    imageConnection {
      edges {
        node {
          url
          description
        }
      }
    }   
    other_tags {
      l1_productConnection {
        edges {
          node {
            ... on L1Products {
              title
              calculated_slug
            }
          }
        }
      }
      l2_productConnection {
        edges {
          node {
            ... on L2Products {
              title
              calculated_slug
            }
          }
        }
      }
      programming_languagesConnection(limit: 3) {
        edges {
          node {
            ... on ProgrammingLanguages {
              title
              calculated_slug
            }
          }
        }
      }
      technologiesConnection(limit: 3) {
        edges {
          node {
            ... on Technologies {
              title
              calculated_slug
            }
          }
        }
      }
    }
    calculated_slug
    description
    end_time
    slug
    start_time
    registration_url
    virtual_meetup_url
    virtual_meetup_url_text
    related_content {
        articlesConnection (limit: 3) {
          edges {
            node {
              ... on Articles {
                title
                original_publish_date
                calculated_slug
                system {
                  publish_details {
                    time
                  }
                }
              }
            }
          }
        }
        podcastsConnection (limit: 5) {
          edges {
            node {
              ... on Podcasts {
                title
                original_publish_date
                calculated_slug: slug
              }
            }
          }
        }
        videosConnection (limit: 5) {
          edges {
            node {
              ... on Videos {
                title
                calculated_slug: slug
                original_publish_date
                system {
                  publish_details {
                    time
                  }
                }
              }
            }
          }
        }
        industry_eventsConnection (limit: 5) {
          edges {
            node {
              ... on IndustryEvents {
                start_time
                end_time
                title
                calculated_slug
              }
            }
          }
        }
      }
`;

export const getAllIndustryEventsQuery = (skip: number, today: string) => `
    query get_all_industry_events {
        all_industry_events(limit: ${CS_GRAPHQL_LIMIT}, where: {end_time_gte: "${today}"}, skip: ${skip})  {
            total
            items {
                ${CS_industryEventsFields}
            }
        }
    }
`;

export const getIndustryEventQuery = (calculatedSlug: string) => `        
    query get_industry_event {
        all_industry_events(where: {calculated_slug: "${calculatedSlug}"}) {
            items {
                ${CS_industryEventsFields}
            }
        }
    }
`;

export const CS_getAllIndustryEventsFromCMS = async (): Promise<
    CS_IndustryEventsResponse[]
> => {
    const today = new Date().toISOString();
    let url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllIndustryEventsQuery(0, today)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_industry_events;
    while (items.length < total) {
        url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllIndustryEventsQuery(
            items.length,
            today
        )}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_industry_events.items);
    }
    return items;
};

export const CS_getIndustryEventBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_IndustryEventsResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getIndustryEventQuery(calculatedSlug)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_industry_events;
    return items[0];
};

export const CS_getDraftIndustryEventBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_IndustryEventsResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=staging&query=${getIndustryEventQuery(calculatedSlug)}`;
    const { data } = await axios.get(url, { headers: CS_STAGING_HEADERS });
    const { items } = data.data.all_industry_events;
    return items[0];
};
