import { Author, CS_AuthorResponse } from '../interfaces/author';
import {
    CS_getAllAuthorsFromCMS,
    CS_getAuthorFromCMS,
    getAllAuthorsFromAPI,
    getAuthorFromAPI,
} from '../api-requests/get-authors';
import { STRAPI_CLIENT } from '../config/api-client';

// STRAPI

export const getAllAuthors = async (): Promise<Author[]> => {
    return getAllAuthorsFromAPI(STRAPI_CLIENT);
};

export const getAuthor = async (
    calculatedSlug: string
): Promise<Author | null> => getAuthorFromAPI(STRAPI_CLIENT, calculatedSlug);

// CONTENTSTACK

export const mapAuthor = (author: CS_AuthorResponse): Author => {
    // Can't just set the image property to undefined since it is not serializable.
    const { imageConnection, job_title, title, ...authorRest } = author;
    const image = imageConnection?.edges[0]?.node;
    const mappedAuthor: Author = {
        ...authorRest,
        title: job_title,
        name: title,
    };
    if (image) {
        mappedAuthor.image = image;
    }
    return mappedAuthor;
};

export const CS_getAllAuthors = async (): Promise<Author[]> => {
    const CMSAuthors = await CS_getAllAuthorsFromCMS();
    return CMSAuthors.map(mapAuthor);
};

export const CS_getAuthor = async (
    calculatedSlug: string
): Promise<Author | null> => {
    const author = await CS_getAuthorFromCMS(calculatedSlug);
    return mapAuthor(author);
};
