import {
    CS_FeaturedContentResponse,
    FeaturedResponse,
} from '../interfaces/featured';
import { transformCSFeaturedContentResponse } from './get-all-featured';
import { fetchAll, getClient } from './contentstack_utils';
import { getFeaturedForTopicQuery } from '../graphql/featured-content';

export const CS_getFeaturedContentForTopic = async (
    topicSlug: string
): Promise<FeaturedResponse> => {
    const client = getClient('production');
    const variables = { topicSlug };
    const featuredContent = (await fetchAll(
        getFeaturedForTopicQuery,
        'featuredContent',
        client,
        variables
    )) as CS_FeaturedContentResponse[];

    return transformCSFeaturedContentResponse(featuredContent)[0];
};
