type Nullable<T> = T | null;

export interface OG {
    description: string;
    image: string;
    title: string;
    type: string;
    url: string;
}

export interface SEO {
    title: string;
    metaDescription: string;
    canonicalUrl?: Nullable<string>;
    og?: Nullable<OG>;
}
