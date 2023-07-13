import {
    OtherTagConnection,
    CS_OtherTags,
    CS_PreviewOtherTag,
    CS_PreviewOtherTags,
} from './other-tags';
import { Media, CS_Media } from './media';
import { CS_SEO } from './seo';

export interface Video extends Media {
    videoId: string;
}

interface CS_VideoOtherTags extends CS_OtherTags {
    expertise_levelConnection: OtherTagConnection;
    spoken_languageConnection: OtherTagConnection;
    author_typeConnection: OtherTagConnection;
}

// Note that while authors are available on Podcasts,
// including it exceeds the maximum fetch size by CS;
// The original interface also did not need it and excluded it
export interface CS_VideoResponse extends CS_Media {
    title: string;
    description: string;
    original_publish_date: string;
    slug: string;
    thumbnail_url: string;
    video_id: string;
    media_type: string;
    other_tags: CS_VideoOtherTags;
    seo: CS_SEO;
    relevant_links: string;
    casted_slug: string;
    l1_productConnection: OtherTagConnection;
    l2_productConnection: OtherTagConnection;
    programming_languagesConnection: OtherTagConnection;
    technologiesConnection: OtherTagConnection;
}

// PREVIEW
export interface CS_PreviewVideoResponse {
    title: string;
    description: string;
    original_publish_date: string;
    slug: string;
    thumbnail_url: string;
    video_id: string;
    media_type: string;
    other_tags: CS_PreviewOtherTags;
    seo: CS_SEO;
    relevant_links: string;
    l1_product: CS_PreviewOtherTag[];
    l2_product: CS_PreviewOtherTag[];
    programming_languages: CS_PreviewOtherTag[];
    technologies: CS_PreviewOtherTag[];
}
