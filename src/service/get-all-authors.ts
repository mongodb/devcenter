import { Author, CS_AuthorResponse } from '../interfaces/author';
import {
    CS_getAllAuthorsFromCMS,
    CS_getAuthorFromCMS,
} from '../api-requests/get-authors';

const mapAuthor = (author: CS_AuthorResponse): Author => {
    // Can't just set the image property to undefined since it is not serializable.
    const { imageConnection, job_title, title, ...authorRest } = author;
    const image = imageConnection?.edges[0]?.node;
    const mappedAuthor: Author = {
        ...authorRest,
        name: title,
    };
    if (job_title) {
        mappedAuthor.title = job_title;
    }
    if (image) {
        mappedAuthor.image = image;
    }

    return mappedAuthor;
};

type CS_AuthorResponses = {
    node: CS_AuthorResponse | undefined;
}[];

export const mapAuthors = (authors: CS_AuthorResponses): Author[] => {
    authors = authors.filter(({ node }) => node !== undefined);
    return authors.map(({ node }) => mapAuthor(node as CS_AuthorResponse));
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
