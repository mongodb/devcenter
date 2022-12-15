import { Coordinates } from './coordinates';
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
