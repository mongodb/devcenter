import { STRAPI_CLIENT } from '../config/api-client';
import { Author } from '../interfaces/author';
import {
    getAllAuthorsFromAPI,
    getAuthorFromAPI,
} from '../api-requests/get-authors';

export const getAllAuthors = async (): Promise<Author[]> => {
    return getAllAuthorsFromAPI(STRAPI_CLIENT);
};

export const getAuthor = async (
    calculatedSlug: string
): Promise<Author | null> => {
    return getAuthorFromAPI(STRAPI_CLIENT, calculatedSlug);
};
