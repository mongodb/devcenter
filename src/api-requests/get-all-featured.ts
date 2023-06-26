import {
    CategoryConnection,
    CS_FeaturedContentResponse,
    FeaturedResponse,
} from '../interfaces/featured';
import { fetchAll, getClient } from './contentstack_utils';
import { getAllFeaturedContentQuery } from '../graphql/featured-content';

const getCalculatedSlug = (categoryConnection: CategoryConnection) => {
    if (!categoryConnection) {
        return null;
    }
    return categoryConnection.edges.length > 0
        ? categoryConnection.edges[0].node.calculated_slug
        : null;
};

export const transformCSFeaturedContentResponse = (
    items: CS_FeaturedContentResponse[]
) => {
    return items.map(item => {
        return {
            calculated_slug: getCalculatedSlug(item.categoryConnection),
            articles: item.articlesConnection.edges.map(a => {
                return { title: a.node.title };
            }),
            videos: item.videosConnection.edges.map(v => {
                return { title: v.node.title };
            }),
            podcasts: item.podcastsConnection.edges.map(p => {
                return { title: p.node.title };
            }),
            events: item.industry_eventsConnection.edges.map(i => {
                return { title: i.node.title };
            }),
        } as FeaturedResponse;
    });
};

export const CS_getAllFeaturedContent = async (): Promise<
    FeaturedResponse[]
> => {
    const client = getClient('production');
    const featuredContent = (await fetchAll(
        getAllFeaturedContentQuery,
        'featuredContent',
        client
    )) as CS_FeaturedContentResponse[];

    return transformCSFeaturedContentResponse(featuredContent);
};
