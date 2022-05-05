import { STRAPI_CLIENT } from '../config/api-client';
import { Author } from '../interfaces/author';
import { getAllAuthorsFromAPI } from '../api-requests/get-authors';

export const getAllAuthors = async (): Promise<Author[]> => {
    return getAllAuthorsFromAPI(STRAPI_CLIENT);
};
