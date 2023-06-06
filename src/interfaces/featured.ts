export interface FeaturedItem {
    title: string;
}

export interface Featured {
    articles: string[];
    podcasts: string[];
    videos: string[];
    events: string[];
}

export interface FeaturedResponse {
    articles: FeaturedItem[] | null;
    podcasts: FeaturedItem[] | null;
    videos: FeaturedItem[] | null;
    events: FeaturedItem[] | null;
}

export interface CategoryConnection {
    edges: { node: { calculated_slug: string } }[];
}

interface FeaturedReferenceConnection {
    edges: { node: { title: string } }[];
}

export interface CS_FeaturedContentResponse {
    categoryConnection: CategoryConnection;
    articlesConnection: FeaturedReferenceConnection;
    videosConnection: FeaturedReferenceConnection;
    podcastsConnection: FeaturedReferenceConnection;
    industry_eventsConnection: FeaturedReferenceConnection;
}
