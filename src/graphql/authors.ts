import { gql } from '@apollo/client';
import { CS_GRAPHQL_LIMIT } from '../data/constants';

const authorFields = gql`
    fragment AuthorFields on Authors {
        bio
        calculated_slug
        facebook
        imageConnection {
            edges {
                node {
                    url
                }
            }
        }
        job_title
        linkedin
        location
        title
        twitter
        youtube
    }
`;

export const getAllAuthorsQuery = gql`
    query get_all_authors($skip: Int = 0) {
        authors: all_authors(limit: ${CS_GRAPHQL_LIMIT}, skip: $skip) {
            total
            items {
                ...AuthorFields
            }
        }
    }
    ${authorFields}
`;

export const getAuthorQuery = gql`
    query get_author($calculatedSlug: string, $skip: Int = 0) {
        authors: all_authors(
            where: { calculated_slug: $calculatedSlug }
            skip: $skip
        ) {
            total
            items {
                ...AuthorFields
            }
        }
    }
    ${authorFields}
`;
