import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { articleFields } from './get-articles';
import { videoFields } from './get-videos';
import { podcastFields } from './get-podcasts';
import { Article } from '../interfaces/article';
import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';

export const getContentBySlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    slug: string
): Promise<{ articles: Article[]; videos: Video[]; podcasts: Podcast[] }> => {
    const query = gql`
        query GetContentBySlug {
            articles @rest(type: "Article", path: "/new-articles?calculated_slug_eq=${slug}") {
                ${articleFields}
            }
            videos @rest(type: "Video", path: "/new-videos?slug_eq=${slug}") {
                ${videoFields}
            }
            podcasts @rest(type: "Podcast", path: "/podcasts?slug_eq=${slug}") {
                ${podcastFields}
            }
        }
    `;
    const {
        data,
    }: ApolloQueryResult<{
        articles: Article[];
        videos: Video[];
        podcasts: Podcast[];
    }> = await client.query({ query });

    return data;
};

export default getContentBySlugFromAPI;
