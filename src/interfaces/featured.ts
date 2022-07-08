export interface FeaturedItem {
    title: string;
}

export interface Featured {
    articles: string[];
    podcasts: string[];
    videos: string[];
}

export interface FeaturedResponse {
    articles: FeaturedItem[] | null;
    podcasts: FeaturedItem[] | null;
    videos: FeaturedItem[] | null;
}
