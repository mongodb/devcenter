import axios from 'axios';

import { CS_AuthorResponse } from '../interfaces/author';
import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

import { Author } from '../interfaces/author';
import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';

const authorFields = `
    name
    bio
    image {
        url
    }
    location
    title
    linkedin
    facebook
    twitter
    calculated_slug
    articles: new_articles {
        description
        authors {
            name
            bio
            image {
                url
            }
            calculated_slug
            twitter
        }
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
        }
        calculatedSlug: calculated_slug
    }
    podcasts
    videos: new_videos
`;

export const getAllAuthorsFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Author[]> => {
    const query = gql`
        query Authors {
            authors @rest(type: "Authors", path: "/authors") {
                ${authorFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ authors: Author[] }> =
        await client.query({ query });

    return data.authors;
};

export const getAuthorFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<Author | null> => {
    const query = gql`
        query Authors {
            authors @rest(type: "Authors", path: "/authors?calculated_slug_eq=${calculatedSlug}") {
                ${authorFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ authors: Author[] }> =
        await client.query({ query });

    return data.authors.length > 0 ? data.authors[0] : null;
};

const CS_authorFields = `
    bio
    calculated_slug
    facebook
    imageConnection {
    edges {
        node {
        url
        }
    }
    }
    job_title
    linkedin
    location
    title
    twitter
    youtube
`;

export const getAllAuthorsQuery = (skip: number) => `
    query get_all_authors {
        all_authors(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip})  {
            total
            items {
                ${CS_authorFields}
            }
        }
    }
`;
export const getAuthorQuery = (calculatedSlug: string) => `        
    query get_author {
        all_authors(where: {calculated_slug: "${calculatedSlug}"}) {
            ${CS_authorFields}
        }
    }
`;
export const CS_getAllAuthorsFromCMS = async (): Promise<
    CS_AuthorResponse[]
> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllAuthorsQuery(0)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_authors;

    while (items.length < total) {
        const url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllAuthorsQuery(items.length)}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_authors.items);
    }

    return items;
};

export const CS_getAuthorFromCMS = async (
    calculatedSlug: string
): Promise<CS_AuthorResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAuthorQuery(calculatedSlug)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_authors;
    return items[0];
};
