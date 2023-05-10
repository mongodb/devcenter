import axios from 'axios';

import { CS_ArticleResponse } from '../interfaces/article';
import {
    CS_GRAPHQL_LIMIT,
    CS_HEADERS,
    CS_STAGING_HEADERS,
} from '../data/constants';

const CS_articleFields = `
    calculated_slug
    content
    description
    imageConnection {
      edges {
        node {
          url
          description
        }
      }
    }
    slug
    title
    original_publish_date
    strapi_updated_at
    expiry_date
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
          }
        }
      }
    }
    other_tags {
      author_typeConnection {
        edges {
          node {
            ... on AuthorTypes {
              title
              calculated_slug
            }
          }
        }
      }
      code_type
      content_typeConnection {
        edges {
          node {
            ... on ContentTypes {
              title
              calculated_slug
            }
          }
        }
      }
      expertise_levelConnection {
        edges {
          node {
            ... on Levels {
              title
              calculated_slug
            }
          }
        }
      }
      github_url
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
      livesite_url
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
      spoken_languageConnection {
        edges {
          node {
            ... on SpokenLanguages {
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
    seo {
        canonical_url
        meta_description
        og_description
        og_imageConnection {
            edges {
                node {
                    url
                }
            }
        }
        og_type
        og_url
        twitter_creator
    }
    system {
        updated_at
    }
`;

export const getAllArticlesQuery = (skip: number) => `
    query get_all_articles {
        all_articles(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip})  {
            total
            items {
                ${CS_articleFields}
            }
        }
    }
`;

export const getArticleQuery = (calculatedSlug: string) => `        
    query get_article {
        all_articles(where: {calculated_slug: "${calculatedSlug}"}) {
            items {
                ${CS_articleFields}
            }
        }
    }
`;

export const CS_getAllArticlesFromCMS = async (): Promise<
    CS_ArticleResponse[]
> => {
    let url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllArticlesQuery(0)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_articles;

    while (items.length < total) {
        url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllArticlesQuery(items.length)}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_articles.items);
    }

    return items;
};

export const CS_getArticleBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_ArticleResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getArticleQuery(calculatedSlug)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_articles;
    return items[0];
};

export const CS_getDraftArticleBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_ArticleResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=staging&query=${getArticleQuery(calculatedSlug)}`;
    const { data } = await axios.get(url, { headers: CS_STAGING_HEADERS });
    const { items } = data.data.all_articles;
    return items[0];
};
