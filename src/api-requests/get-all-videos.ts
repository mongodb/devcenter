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
            videos @rest(type: "Video", path: "/new-videos") {
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
            }
        }
    `;
    const { data }: ApolloQueryResult<{ videos: Video[] }> = await client.query(
        { query }
    );

    const videos = JSON.parse(JSON.stringify(data.videos));
    videos.forEach(v => {
        if (v.otherTags) {
            v.otherTags.contentType = {
                contentType: 'Video',
                calculatedSlug: '/videos',
            };
        } else {
            v.otherTags = {
                contentType: {
                    contentType: 'Video',
                    calculatedSlug: '/videos',
                },
            };
        }
        if (v.l1Product) {
            v.otherTags.l1Product = v.l1Product;
        }
        if (v.l2Product) {
            v.otherTags.l2Product = v.l2Product;
        }
        if (v.programmingLanguage) {
            v.otherTags.programmingLanguage = v.programmingLanguage;
        }
        if (v.technology) {
            v.otherTags.technology = v.technology;
        }
    });

    return data.videos;
};

export default getAllVideosFromAPI;
