interface FeaturedItem {
    title: string;
}

export interface Featured {
    articles: string[];
    podcasts: string[];
    videos: string[];
}

export interface FeaturedResponse {
    articles: FeaturedItem[];
    podcasts: FeaturedItem[];
    videos: FeaturedItem[];
}
