import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Video } from '../interfaces/video';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllVideosFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Video[]> => {
    const query = gql`
        query Videos {
            videos @rest(type: "Video", path: "/new-videos?_limit=-1") {
                description
                publishDate: originalPublishDate
                title
                slug
                videoId
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
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videos: Video[] }> = await client.query(
        { query }
    );

    return data.videos;
};

export default getAllVideosFromAPI;