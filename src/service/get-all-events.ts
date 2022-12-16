import { CommunityEvent } from '../interfaces/community-event';
import { getAllCommunityEventsFromApi } from '../api-requests/get-community-events';
import { IndustryEvent } from '../interfaces/community-event';
import getAllIndustryEventsFromAPI from '../api-requests/get-industry-events';
import { STRAPI_CLIENT } from '../config/api-client';

export const getAllIndustryEvents = async (): Promise<IndustryEvent[]> => {
    return getAllIndustryEventsFromAPI(STRAPI_CLIENT);
};

export const getAllCommunityEvents = async (): Promise<CommunityEvent[]> => {
    return getAllCommunityEventsFromApi();
};
