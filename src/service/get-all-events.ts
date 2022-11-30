import { ContentItem } from '../interfaces/content-item';
import { mockResults } from '../mockdata/mock-events-data';

export const getAllEvents = (): ContentItem[] => {
    const events = mockResults; // await getAllVideosFromAPI(STRAPI_CLIENT);
    return events;
};
