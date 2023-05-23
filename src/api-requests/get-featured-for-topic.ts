import { FeaturedResponse } from '../interfaces/featured';
import { CS_HEADERS } from '../data/constants';
import axios from 'axios';
import {
    CS_featuredContentFields,
    transformCSFeaturedContentResponse,
} from './get-all-featured';

export const getFeaturedForTopicQuery = (topicSlug: string) => `        
    query get_featured {
        all_featured_content(
            where: {category: {MATCH: ANY, 
            content_types: {calculated_slug: "${topicSlug}"}, 
            l1_products: {calculated_slug: "${topicSlug}"}, 
            programming_languages: {calculated_slug: "${topicSlug}"}, 
            technologies: {calculated_slug: "${topicSlug}"}}}
        ) {
            items {
                ${CS_featuredContentFields}
            }
        }
    }
`;

export const CS_getFeaturedContentForTopic = async (
    topicSlug: string
): Promise<FeaturedResponse> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getFeaturedForTopicQuery(topicSlug)}`;
    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { items } = data.data.all_featured_content;
    return transformCSFeaturedContentResponse(items)[0];
};
