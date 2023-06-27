import { CS_IndustryEventsResponse } from '../interfaces/event';
import { fetchAll, getClient } from './contentstack_utils';

import {
    getAllIndustryEventsQuery,
    getIndustryEventQuery,
} from '../graphql/industry-events';

export const CS_getAllIndustryEventsFromCMS = async (): Promise<
    CS_IndustryEventsResponse[]
> => {
    const client = getClient('production');
    const today = new Date().toISOString();
    const variables = { today };

    const industryEvents = (await fetchAll(
        getAllIndustryEventsQuery,
        'industry_events',
        client,
        variables
    )) as CS_IndustryEventsResponse[];

    return industryEvents;
};

export const CS_getIndustryEventBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_IndustryEventsResponse> => {
    const client = getClient('production');
    const variables = { calculatedSlug };

    const industryEvents = (await fetchAll(
        getIndustryEventQuery,
        'industry_events',
        client,
        variables
    )) as CS_IndustryEventsResponse[];

    return industryEvents[0];
};

export const CS_getDraftIndustryEventBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_IndustryEventsResponse> => {
    const client = getClient('staging');
    const variables = { calculatedSlug };

    const industryEvents = (await fetchAll(
        getIndustryEventQuery,
        'industry_events',
        client,
        variables
    )) as CS_IndustryEventsResponse[];

    return industryEvents[0];
};
