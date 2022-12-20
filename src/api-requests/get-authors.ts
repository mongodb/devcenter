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
    youtube
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
