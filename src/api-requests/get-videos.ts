import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Video } from '../interfaces/video';

const videoFields = `
    description
    publishDate: originalPublishDate
    title
    slug
    videoId
    relevantLinks: relevant_links
    thumbnailUrl
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
    otherTags: other_tags {
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
`;

/**
 * Returns a list of all videos.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllVideosFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Video[]> => {
    const query = gql`
        query Videos {
            videos @rest(type: "Video", path: "/new-videos?_limit=-1") {
                ${videoFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videos: Video[] }> = await client.query(
        { query }
    );

    return data.videos;
};

/**
 * Returns a list of all videos.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
export const getVideoBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    slug: string
): Promise<Video | null> => {
    const query = gql`
        query Videos {
            videos @rest(type: "Video", path: "/new-videos?slug_eq=${slug}") {
                ${videoFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videos: Video[] }> = await client.query(
        { query }
    );

    return data.videos.length > 0 ? data.videos[0] : null;
};

export default getAllVideosFromAPI;
