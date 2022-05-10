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
            podcasts @rest(type: "Podcast", path: "/podcasts") {
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

    const podcasts = JSON.parse(JSON.stringify(data.podcasts));
    podcasts.forEach(p => {
        if (p.otherTags) {
            p.otherTags.contentType = {
                contentType: 'Podcast',
                calculatedSlug: '/podcasts',
            };
        } else {
            p.otherTags = {
                contentType: {
                    contentType: 'Podcast',
                    calculatedSlug: '/podcasts',
                },
            };
        }

        if (p.l1Product) {
            p.otherTags.l1Product = p.l1Product;
        }
        if (p.l2Product) {
            p.otherTags.l2Product = p.l2Product;
        }
        if (p.programmingLanguage) {
            p.otherTags.programmingLanguage = p.programmingLanguage;
        }
        if (p.technology) {
            p.otherTags.technology = p.technology;
        }
    });

    return podcasts;
};

export default getAllPodcastsFromAPI;
