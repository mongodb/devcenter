interface ImageResponse {
    edges: { node: { url: string } }[];
}

export type Image = {
    url: string;
};
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

export interface AuthorResponse extends AuthorBase {
    imageConnection?: ImageResponse;
    job_title?: string;
    title: string;
}
