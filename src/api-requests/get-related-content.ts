import { ContentItem } from '../interfaces/content-item';
import { ApolloQueryResult, gql } from '@apollo/client';
import { UnderlyingClient } from '../types/client-factory';
import { articleFields } from './get-articles';
import { videoFields } from './get-videos';
import { podcastFields } from './get-podcasts';
import { Article } from '../interfaces/article';
import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';

var qs = require('qs');

const getRelatedContent = (
    slug: string,
    allContents: ContentItem[],
    currentSlug: string
): ContentItem[] => {
    const relatedContent = allContents.filter(c => {
        if (
            c.collectionType !== 'Video' &&
            c.collectionType !== 'Podcast' &&
            c.slug !== currentSlug
        ) {
            const slugsInTags = c.tags.map(tag => tag.slug);
            return slugsInTags.includes(slug);
        }
    });

    // Shuffle array
    relatedContent.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return relatedContent.slice(0, 4);
};

export const getRelatedContentForSlugFromAPI = async (
    client: UnderlyingClient<'ApolloREST'>,
    slug: string,
    currentSlug: string
): Promise<{ articles: Article[]; videos: Video[]; podcasts: Podcast[] }> => {
    const queryStr = qs.stringify({
        _where: [
            {
                _or: [
                    { 'other_tags.technology.calculated_slug': slug },
                    { 'other_tags.programming_language.calculated_slug': slug },
                    { 'other_tags.author_type.calculated_slug': slug },
                    { 'other_tags.content_type.calculated_slug': slug },
                    { 'other_tags.l_1_product.calculated_slug': slug },
                    { 'other_tags.expertise_level.calculated_slug': slug },
                    { 'other_tags.spoken_language.calculated_slug': slug },
                ],
            },
            {
                slug_ne: currentSlug,
            },
        ],
    });

    const query = gql`
        query GetRelatedContent {
            articles @rest(type: "Article", path: "/new-articles?${queryStr}") {
                ${articleFields}
            }
            videos @rest(type: "Video", path: "/new-videos?${queryStr}") {
                ${videoFields}
            }
            podcasts @rest(type: "Podcast", path: "/podcasts?${queryStr}") {
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

export default getRelatedContent;
