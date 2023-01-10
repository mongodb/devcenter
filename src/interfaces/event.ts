import { Author } from './author';
import { Coordinates } from './coordinates';
import { Image } from './image';
import { OtherTags } from './other-tags';
import { Tag } from './tag';

export type EventSetup = 'InPerson' | 'Virtual' | 'Hybrid' | 'Unknown';

export type CommunityEventTagType =
    | 'l_1_product'
    | 'l_2_product'
    | 'technology'
    | 'programming_language';

export interface CommunityEventTag {
    name: string;
    type: CommunityEventTagType;
    slug: string;
}

export interface CommunityEventApiResponse {
    event_setup: EventSetup;
    location: string;
    coordinates: Coordinates;
    title: string;
    description: string;
    tags: CommunityEventTag[];
    start_time: string;
    end_time: string;
    calculated_slug: string;
}

export interface CommunityEvent {
    event_setup: EventSetup;
    location: string;
    coordinates: Coordinates;
    title: string;
    description: string;
    tags: Tag[];
    start_time: string;
    end_time: string;
    slug: string;
}

export interface IndustryEventApiResponse {
    type: string;
    authors: Author[];
    registration_url: string;
    start_time: string;
    slug: string;
    end_time: string;
    location: string;
    title: string;
    content: string;
    coordinates: Coordinates;
    description: string;
    published_at: string;
    other_tags: OtherTags;
    createdAt: string;
    updatedAt: string;
    image: Image;
    updated_by: Author;
    calculated_slug: string;
    virtual_meetup_url: string;
    virtual_meetup_url_text: string;
}

export interface IndustryEvent {
    type: string;
    authors: Author[];
    coordinates: Coordinates;
    content: string;
    title: string;
    published_at: string;
    otherTags: OtherTags;
    created_at: string;
    updated_at: string;
    calculated_slug: string;
    description: string;
    end_time: string;
    location: string;
    slug: string;
    start_time: string;
}
