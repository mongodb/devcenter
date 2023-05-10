import { CommunityEvent } from '../interfaces/event';
import { getAllCommunityEventsFromApi } from '../api-requests/get-community-events';

export const getAllCommunityEvents = async (): Promise<CommunityEvent[]> => {
    return getAllCommunityEventsFromApi();
};
