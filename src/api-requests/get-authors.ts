import axios from 'axios';

import { AuthorResponse } from '../interfaces/author';
import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

// Will have to add articles
const authorFields = `
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
`;

export const getAllAuthorsQuery = (skip: number) => `
    query get_all_authors {
        all_authors(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip})  {
            total
            items {
                ${authorFields}
            }
        }
    }
`;
export const getAuthorQuery = (calculatedSlug: string) => `        
    query get_author {
        all_authors(where: {calculated_slug: "${calculatedSlug}"}) {
            ${authorFields}
        }
    }
`;
export const getAllAuthorsFromCMS = async (): Promise<AuthorResponse[]> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAllAuthorsQuery(0)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data.all_authors;

    while (items.length < total) {
        const url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getAllAuthorsQuery(items.length)}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data.all_authors.items);
    }

    return items;
};

export const getAuthorFromCMS = async (
    uid: string
): Promise<AuthorResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getAuthorQuery(uid)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_authors;
    return items[0];
};
