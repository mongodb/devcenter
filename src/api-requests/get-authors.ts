import { Author } from '../interfaces/author';
import { UnderlyingClient } from '../types/client-factory';
import { ApolloQueryResult, gql } from '@apollo/client';

export const getAllAuthorsFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>
): Promise<Author[]> => {
    const query = gql`
        query Authors {
            authors @rest(type: "Authors", path: "/authors") {
                name
                bio
                image {
                    url
                }
                location
                linkedin
                facebook
                twitter
                youtube
                calculated_slug
                articles: new_articles {
                    name
                    calculated_slug
                    description
                    otherTags: other_tags(first: 1) {
                        contentType: content_type(first: 1) {
                            contentType: content_type
                            calculatedSlug: calculated_slug
                        }
                    }
                }
            }
        }
    `;
    const { data }: ApolloQueryResult<{ authors: Author[] }> =
        await client.query({ query });

    return data.authors;
};
