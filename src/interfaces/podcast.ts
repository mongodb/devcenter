import { Media } from './media';

export interface Podcast extends Media {
    podcastFileUrl: string;
    casted_slug: string;
}
