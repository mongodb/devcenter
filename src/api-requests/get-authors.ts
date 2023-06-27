import { getAllAuthorsQuery, getAuthorQuery } from '../graphql/authors';
import { CS_AuthorResponse } from '../interfaces/author';
import { fetchAll, getClient } from './contentstack_utils';

export const CS_getAllAuthorsFromCMS = async (): Promise<
    CS_AuthorResponse[]
> => {
    const client = getClient('production');
    const authors = (await fetchAll(
        getAllAuthorsQuery,
        'authors',
        client
    )) as CS_AuthorResponse[];

    return authors;
};

export const CS_getAuthorFromCMS = async (
    calculatedSlug: string
): Promise<CS_AuthorResponse> => {
    const client = getClient('production');
    const variables = { calculatedSlug };
    const authors = (await fetchAll(
        getAuthorQuery,
        'authors',
        client,
        variables
    )) as CS_AuthorResponse[];

    return authors[0];
};
