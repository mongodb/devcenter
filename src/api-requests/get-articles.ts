import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { Article } from '../interfaces/article';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
export const getArticles = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/articles") {
                title: name
                description
                slug
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};

export const getAllArticlesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Article[]> => {
    const query = gql`
        query Articles {
            articles @rest(type: "Article", path: "/new-articles?_limit=-1") {
                authors {
                    name
                    bio
                    image {
                        url
                    }
                    calculated_slug
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
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ articles: Article[] }> =
        await client.query({ query });

    return data.articles;
};
