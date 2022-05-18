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

/*
SEO {
          canonical_url
          meta_description
          og_description
          og_image {
            url
          }
          og_title
          og_type
          og_url
          twitter_card
          twitter_creator
          twitter_description
          twitter_image {
            url
          }
          twitter_site
          twitter_title
        }
 */
