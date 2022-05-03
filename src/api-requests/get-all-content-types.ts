import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { ContentTypeTag } from '../interfaces/tag-type-response';

/**
 * Returns a list of all content types
 * @param client -  The Apollo REST client that will be used to make the request.
 */
const getAllContentTypesFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<ContentTypeTag[]> => {
    const query = gql`
        query ContentTypes {
            content_types
                @rest(type: "ContentTypeTag", path: "/content-types") {
                contentType: content_type
                calculatedSlug: calculated_slug
            }
        }
    `;
    const { data }: ApolloQueryResult<{ content_types: ContentTypeTag[] }> =
        await client.query({ query });

    return data.content_types;
};

export default getAllContentTypesFromAPI;
