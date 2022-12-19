import { CommunityEvent } from '../interfaces/community-event';
import { getAllCommunityEventsFromApi } from '../api-requests/get-community-events';

export const getAllCommunityEvents = async (): Promise<CommunityEvent[]> => {
    return getAllCommunityEventsFromApi();
};
