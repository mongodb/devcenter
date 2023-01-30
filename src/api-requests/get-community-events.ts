import {
    CommunityEvent,
    CommunityEventApiResponse,
    CommunityEventTagType,
} from '../interfaces/event';
import * as Sentry from '@sentry/nextjs';
import { Tag } from '../interfaces/tag';
import { TagType } from '../types/tag-type';

/**
 * Returns a list of all community events
 */
const getAllCommunityEvents = async (): Promise<
    CommunityEventApiResponse[]
> => {
    const url = `${process.env.REALM_API_URL}/community_events`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    try {
        const req = await fetch(url, options);
        return req.json();
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch community events.');
    }
};

const TagMap: { [key in CommunityEventTagType]: TagType } = {
    l_1_product: 'L1Product',
    l_2_product: 'L2Product',
    technology: 'Technology',
    programming_language: 'ProgrammingLanguage',
};

const map_tag_type = (type: CommunityEventTagType): TagType => {
    return TagMap[type];
};

export const getAllCommunityEventsFromApi = async (): Promise<
    CommunityEvent[]
> => {
    const communityEventApiResponse: CommunityEventApiResponse[] =
        await getAllCommunityEvents();
    return communityEventApiResponse.map(r => {
        return {
            event_setup: r.event_setup,
            location: r.location,
            coordinates: r.coordinates,
            title: r.title,
            description: r.description,
            tags: r.tags.map(t => {
                return {
                    name: t.name,
                    slug: t.slug,
                    type: map_tag_type(t.type),
                };
            }) as Tag[],
            start_time: r.start_time,
            end_time: r.end_time,
            slug: r.calculated_slug,
        };
    }) as CommunityEvent[];
};
