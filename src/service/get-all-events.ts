import { CommunityEvent, CS_IndustryEventsResponse } from '../interfaces/event';
import { getAllCommunityEventsFromApi } from '../api-requests/get-community-events';
import { CS_getAllIndustryEventsFromCMS } from '../api-requests/get-industry-events';

export const getAllIndustryEvents = async (): Promise<
    CS_IndustryEventsResponse[]
> => {
    return CS_getAllIndustryEventsFromCMS();
};

export const getAllCommunityEvents = async (): Promise<CommunityEvent[]> => {
    return getAllCommunityEventsFromApi();
};
