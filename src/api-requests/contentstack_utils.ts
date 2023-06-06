import { UnderlyingClient } from '../types/client-factory';
import { DocumentNode } from 'graphql';

type gqlParents =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes'
    | 'articleSeries'
    | 'articles'
    | 'authors'
    | 'industryEvents'
    | 'podcastSeries'
    | 'podcasts'
    | 'videoSeries'
    | 'videos';

/**
 * Helper function to overcome Contentstack's pagination limit.
 * Expects query to have a total and will not fetch anything otherwise.
 */
export const fetchAll = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    query: DocumentNode,
    gqlParentName: gqlParents,
    vars?: { [key: string]: any }
) => {
    // expect all incoming cs_query already has total
    const response: any = await client.query({ query, variables: vars });

    const { total } = response.data[gqlParentName];

    let allItems: { [key: string]: any }[] = [];

    while (allItems.length < total) {
        const variables = { ...vars, skip: allItems.length };
        const res: any = await client.query({ query, variables });
        const { items } = res.data[gqlParentName];

        allItems = allItems.concat(items);
    }

    return allItems;
};
