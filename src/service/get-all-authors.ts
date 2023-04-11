import { Author, AuthorResponse } from '../interfaces/author';
import {
    getAllAuthorsFromCMS,
    getAuthorFromCMS,
} from '../api-requests/get-authors';

const mapAuthor = (author: AuthorResponse): Author => {
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
    console.log(mappedAuthor);
    return mappedAuthor;
};

export const getAllAuthors = async (): Promise<Author[]> => {
    const CMSAuthors = await getAllAuthorsFromCMS();
    return CMSAuthors.map(mapAuthor);
};

export const getAuthor = async (
    calculatedSlug: string
): Promise<Author | null> => {
    const author = await getAuthorFromCMS(calculatedSlug);
    return mapAuthor(author);
};
