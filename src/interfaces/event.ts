import { Coordinates } from './coordinates';
import { Tag } from './tag';
import { AuthorsConnection } from './article';
import { ImageConnection } from './image';
import { CS_ArticleOtherTags } from './article';
import { Connection } from './connection';

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

export interface IndustryEventRelatedContent {
    title: string;
    contentDate: string | [string, string];
    slug: string;
    category: string;
}

export interface Address {
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    coordinates: string;
    country?: string;
    location: string;
    preferred_location?: string;
    state?: string;
    zipcode?: string;
}

export interface CS_IndustryEventRelatedContentFromCMS {
    [field: string]: Array<{
        title: string;
        calculated_slug?: string;
        end_time?: string;
        start_time?: string;
        original_publish_date?: string;
        system?: { publish_details: { time: string } };
    }>;
}

export interface CS_RelatedContentResponse {
    title: string;
    calculated_slug: string;
    original_publish_date?: string;
    start_time?: string;
    end_time?: string;
    system?: { publish_details: { time: string } };
}

export interface RelatedContentConnection extends Connection {
    edges: { node: CS_RelatedContentResponse }[];
}

export interface CS_IndustryEventRelatedContent {
    articlesConnection?: RelatedContentConnection;
    podcastsConnection?: RelatedContentConnection;
    videosConnection?: RelatedContentConnection;
    industry_eventsConnection?: RelatedContentConnection;
}

export interface CS_IndustryEventsResponse {
    type: string;
    authorsConnection: AuthorsConnection;
    address: Address;
    content: string;
    title: string;
    imageConnection: ImageConnection;
    other_tags: CS_ArticleOtherTags;
    calculated_slug: string;
    description: string;
    end_time: string;
    slug: string;
    start_time: string;
    registration_url: string;
    virtual_meetup_url: string;
    virtual_meetup_url_text: string;
    related_content: CS_IndustryEventRelatedContent;
}
