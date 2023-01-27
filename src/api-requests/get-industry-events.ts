import { ApolloQueryResult, gql } from '@apollo/client';
import { IndustryEvent } from '../interfaces/event';
import { UnderlyingClient } from '../types/client-factory';

export const industryEventsFields = `
    type
    authors {
        name
        bio
        title
        image {
            url
        }
        calculated_slug
        twitter
    }
    image {
        url
        alt: alternativeText
    }
    coordinates
    content
    title
    published_at
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
        technology {
            name
            calculatedSlug: calculated_slug
        }
    }
    createdAt
    updatedAt
    calculated_slug
    description
    end_time
    location
    city
    state
    country
    slug
    start_time
    registration_url
    virtual_meetup_url
    virtual_meetup_url_text
    related_content {
        newArticles: new_articles {
            title: name
            originalPublishDate
            published_at
            calculated_slug
        }
        newVideos: new_videos {
            title
            originalPublishDate
            slug: calculated_slug
        }
        industryEvents: industry_events {
            title
            calculated_slug
            start_time
            end_time
        }
        podcasts {
            title
            originalPublishDate
            slug: calculated_slug
        }
    }
`;

/**
 * Returns a list of all industry events.
 * @param client -  The Apollo REST client that will be used to make the request.
 */
export const getAllIndustryEventsFromApi = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<IndustryEvent[]> => {
    const query = gql`
        query IndustryEvents {
            industryEvents @rest(type: "IndustryEvent", path: "/upcoming-industry-events") {
                ${industryEventsFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ industryEvents: IndustryEvent[] }> =
        await client.query({ query });

    return data.industryEvents;
};

export const getIndustryEventBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<IndustryEvent | null> => {
    const query = gql`
        query IndustryEvents {
            industryEvents @rest(type: "IndustryEvent", path: "/industry-events?calculated_slug=${calculatedSlug}") {
                ${industryEventsFields}
            }
        }
    `;
    const { data }: ApolloQueryResult<{ industryEvents: IndustryEvent[] }> =
        await client.query({ query });

    return data.industryEvents.length > 0 ? data.industryEvents[0] : null;
};

export const getDraftEventFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    calculatedSlug: string
): Promise<IndustryEvent | null> => {
    calculatedSlug = '"' + calculatedSlug + '"';
    const query = gql`
        query IndustryEvents {
            industryEvents(_publicationState : "preview", calculated_slug : ${calculatedSlug})
            @rest(type: "IndustryEvent", path: "/industry-events?{args}") {
                ${industryEventsFields}
            }
        }`;
    const { data }: ApolloQueryResult<{ industryEvents: IndustryEvent[] }> =
        await client.query({ query, fetchPolicy: 'no-cache' });

    return data.industryEvents.length > 0 ? data.industryEvents[0] : null;
};
