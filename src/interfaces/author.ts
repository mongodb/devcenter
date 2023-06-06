export type Image = {
    url: string;
};
// CONTENTSTACK

interface ImageConnection {
    edges: { node: { url: string } }[];
}

interface AuthorBase {
    url?: string;
    bio?: string;
    location?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    calculated_slug: string;
}
export interface Author extends AuthorBase {
    image?: Image;
    title?: string;
    name: string;
}

export interface CS_AuthorResponse extends AuthorBase {
    imageConnection?: ImageConnection;
    job_title?: string;
    title: string;
}
