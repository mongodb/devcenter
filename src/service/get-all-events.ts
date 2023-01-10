import { CommunityEvent } from '../interfaces/event';
import { getAllCommunityEventsFromApi } from '../api-requests/get-community-events';
import { getAllIndustryEventsFromApi } from '../api-requests/get-industry-events';
import { IndustryEvent } from '../interfaces/event';
import { STRAPI_CLIENT } from '../config/api-client';

export const getAllIndustryEvents = async (): Promise<IndustryEvent[]> => {
    return getAllIndustryEventsFromApi(STRAPI_CLIENT);
};

export const getAllCommunityEvents = async (): Promise<CommunityEvent[]> => {
    return getAllCommunityEventsFromApi();
};
