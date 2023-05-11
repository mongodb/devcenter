import { ImageConnection } from './article';

interface OGImage {
    url: string;
}

interface TwitterImage {
    url: string;
}

export interface SEO {
    canonical_url?: string;
    meta_description?: string;
    og_description?: string;
    og_image?: OGImage;
    og_title?: string;
    og_type?: string;
    og_url?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_description?: string;
    twitter_image?: TwitterImage;
    twitter_site?: string;
    twitter_title?: string;
}

export interface CS_SEO {
    canonical_url?: string;
    meta_description?: string;
    og_description?: string;
    og_imageConnection?: ImageConnection;
    og_title?: string;
    og_type?: string;
    og_url?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_description?: string;
    twitter_imageConnection?: ImageConnection;
    twitter_site?: string;
    twitter_title?: string;
}
