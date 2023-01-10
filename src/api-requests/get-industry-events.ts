import { ApolloQueryResult, gql } from '@apollo/client';
import { IndustryEvent } from '../interfaces/event';
import { UnderlyingClient } from '../types/client-factory';

export const industryEventsFields = `
  type
  authors {
    name
    bio
    image {
        url
    }
    calculated_slug
    twitter
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
      technology: technology {
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
  slug
  start_time
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
