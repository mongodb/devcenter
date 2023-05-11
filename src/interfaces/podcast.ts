import { OtherTagConnection, CS_OtherTags } from './other-tags';
// import { OtherTagConnection } from './article';
import { Media, CS_Media } from './media';
import { CS_SEO } from './seo';

export interface Podcast extends Media {
    podcastFileUrl: string;
    casted_slug: string;
}

interface CS_PodcastOtherTags extends CS_OtherTags {
    expertise_levelConnection: OtherTagConnection;
    spoken_languageConnection: OtherTagConnection;
    author_typeConnection: OtherTagConnection;
}

// Note that while authors are available on Podcasts,
// including it exceeds the maximum fetch size by CS;
// The original interface also did not need it and excluded it
export interface CS_PodcastResponse extends CS_Media {
    title: string;
    description: string;
    slug: string;
    podcast_file_url: string;
    thumbnail_url: string;
    original_publish_date: string;
    media_type: string;
    other_tags: CS_PodcastOtherTags | null;
    seo: CS_SEO;
    casted_slug: string;
    l1_productConnection: OtherTagConnection;
    l2_productConnection: OtherTagConnection;
    technologiesConnection: OtherTagConnection;
    programming_languagesConnection: OtherTagConnection;
}
