import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { Podcast } from '../interfaces/podcast';

/**
 * Returns a list of all articles.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllPodcastsFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Podcast[]> => {
    const query = gql`
        query Podcasts {
            podcasts @rest(type: "Podcast", path: "/podcasts?_limit=-1") {
                description
                publishDate: originalPublishDate
                title
                slug
                podcastFileUrl
                thumbnailUrl
                casted_slug
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
    const { data }: ApolloQueryResult<{ podcasts: Podcast[] }> =
        await client.query({ query });

    return data.podcasts;
};

export default getAllPodcastsFromAPI;
