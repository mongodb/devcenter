import { ImageConnection } from './image';

export interface SEOImage {
    url: string;
    description: string;
}

export interface SEO {
    canonical_url?: string;
    meta_description?: string;
    og_description?: string;
    og_image?: SEOImage;
    og_title?: string;
    og_type?: string;
    og_url?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_description?: string;
    twitter_image?: SEOImage;
    twitter_site?: string;
    twitter_title?: string;
}

export interface CS_SEO {
    canonical_url?: string;
    meta_description?: string;
    og_url?: string;
    og_imageConnection?: ImageConnection;
    og_type?: string;
    og_description?: string;
    twitter_creator?: string;
    twitter_description?: string;
    twitter_imageConnection?: ImageConnection;
    twitter_card?: string | null;
}
