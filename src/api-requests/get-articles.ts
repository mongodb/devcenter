import axios from 'axios';

import { CS_ArticleRepsonse } from '../interfaces/article';
import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { Article } from '../interfaces/article';

// STRAPI

const articleFields = `authors {
                    name
                    bio
                    image {
                        url
                    }
                    calculated_slug
                    twitter
                }
                description
                content
                slug
                image {
                    url
                }
                title: name
                publishDate: published_at
                originalPublishDate
                updateDate: updatedAt
                otherTags: other_tags {
                    l1Product: l_1_product {
                        name
                        calculatedSlug: calculated_slug
                    }
                    l2Product: l_2_product {
                        name
                        calculatedSlug: calculated_slug
                    }
                    programmingLanguage: programming_language {
                        name
                        calculatedSlug: calculated_slug
                    }
                    technology: technology {
                        name
                        calculatedSlug: calculated_slug
                    }
                    contentType: content_type {
                        contentType: content_type
                        calculatedSlug: calculated_slug
                    }
                    spokenLanguage: spoken_language {
                        name
                        calculatedSlug: calculated_slug
                    }
                    expertiseLevel: expertise_level {
                        name: level
                        calculatedSlug: calculated_slug
                    }
                    authorType: author_type {
                        name
                        calculatedSlug: calculated_slug
                    }
                    githubUrl: githuburl
                    liveSiteUrl: livesiteurl
                    codeType: code_type
                }
                calculatedSlug: calculated_slug
                seo: SEO {
                    canonical_url
                    meta_description
                    og_description
                    og_image {
                        url
                    }
                    og_title
                    og_type
                    og_url
                    twitter_card
                    twitter_creator
                    twitter_description
                    twitter_image {
                        url
                    }
                    twitter_site
                    twitter_title
                }`;

export const getAllArticlesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/new-articles?_limit=-1") {
                   ${articleFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};

export const getAllDraftArticlesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<Article[]> => {
    calculatedSlug = '"' + calculatedSlug + '"';
    const query = gql`
        query Articles {
            articles(_publicationState : "preview", calculated_slug : ${calculatedSlug})
            @rest(type: "Article", path: "/new-articles?{args}") {
                ${articleFields}
            }
        }`;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query, fetchPolicy: 'no-cache' });

    return data.articles;
};

export const getArticleBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<Article | null> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/new-articles?calculated_slug_eq=${calculatedSlug}") {
                ${articleFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles.length > 0 ? data.articles[0] : null;
};

// CONTENTSTACK

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
            ${CS_articleFields}
        }
    }
`;

export const CS_getAllArticlesFromCMS = async (): Promise<
    CS_ArticleRepsonse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllArticlesQuery(0)}`;
    console.log(url);

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_articles;

    while (items.length < total) {
        const url = `${
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
): Promise<CS_ArticleRepsonse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getArticleQuery(calculatedSlug)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_articles;
    return items[0];
};
