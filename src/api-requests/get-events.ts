import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';

const eventFields = `
    speakers: authors {
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
    image {
        url
    }
    eventType: type
    startTime: start_time
    endTime: end_time
    coordinates
    location
    registrationLink: registration_url
    virtualLink: virtual_meetup_url
    virtualLinkText: virtual_meetup_url_text
    title: name
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
    }
    calculatedSlug: calculated_slug
`;

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
};
