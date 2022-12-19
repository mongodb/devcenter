import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';

// TODO: verify needed and not needed fields
// TODO: do the mapping here so there's no need to do the additional step
const eventFields = `authors {
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
                type
                start_time
                end_time
                coordinates
                location
                registration_url
                virtual_meetup_url
                virtual_meetup_url_text
                title: name
                publishDate: published_at
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
                calculatedSlug: calculated_slug`;

export const getEventBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<any | null> => {
    const query = gql`
        query IndustryEvents {
            industryEvents @rest(type: "Event", path: "/industry-events?calculated_slug=${calculatedSlug}") {
                ${eventFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<any> = await client.query({ query });

    return data.industryEvents.length > 0 ? data.industryEvents[0] : null;
    // return data.articles.length > 0 ? data.articles[0] : null;
};
