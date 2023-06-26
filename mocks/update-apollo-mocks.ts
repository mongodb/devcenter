const fs = require('fs');
const path = require('path');

import { DocumentNode } from 'graphql';
import { fetchAllForMocks } from '../src/api-requests/contentstack_utils';
import { getAllIndustryEventsQuery } from '../src/graphql/industry-events';
import { getAllPodcastsQuery } from '../src/graphql/podcasts';
import { getAllVideosQuery } from '../src/graphql/videos';
import { getAllArticlesQuery } from '../src/graphql/articles';
import { getAllAuthorsQuery } from '../src/graphql/authors';
import { getAllArticleSeriesQuery } from '../src/graphql/article-series';
import { getAllPodcastSeriesQuery } from '../src/graphql/podcast-series';
import { getAllVideoSeriesQuery } from '../src/graphql/video-series';
import { getAllFeaturedContentQuery } from '../src/graphql/featured-content';
import { ContentTypeUID } from '../src/interfaces/meta-info';
import {
    getAllAuthorTypesQuery,
    getAllContentTypesQuery,
    getAllL1ProductsQuery,
    getAllL2ProductsQuery,
    getAllLevelsQuery,
    getAllProgrammingLanguagesQuery,
    getAllSpokenLanguagesQuery,
    getAllTechnologiesQuery,
} from '../src/graphql/meta-info';

interface QueryInfo {
    query: DocumentNode;
    variables?: Record<string, any>;
    contentTypeUID: ContentTypeUID;
    supportedOperations: string[];
}

export const queryInfos: QueryInfo[] = [
    {
        query: getAllArticleSeriesQuery,
        contentTypeUID: 'article_series',
        supportedOperations: ['get_all_article_series'],
    },
    {
        query: getAllArticlesQuery,
        contentTypeUID: 'articles',
        supportedOperations: ['get_article', 'get_all_articles'],
    },
    {
        query: getAllAuthorTypesQuery,
        contentTypeUID: 'author_types',
        supportedOperations: ['get_all_author_types'],
    },
    {
        query: getAllAuthorsQuery,
        contentTypeUID: 'authors',
        supportedOperations: ['get_author', 'get_all_authors'],
    },
    {
        query: getAllContentTypesQuery,
        contentTypeUID: 'content_types',
        supportedOperations: ['get_all_content_types'],
    },
    {
        query: getAllLevelsQuery,
        contentTypeUID: 'levels',
        supportedOperations: ['get_all_levels'],
    },
    {
        query: getAllFeaturedContentQuery,
        contentTypeUID: 'featured_content',
        supportedOperations: ['get_all_featured_content'],
    },
    {
        query: getAllIndustryEventsQuery,
        variables: { today: new Date().toISOString() },
        contentTypeUID: 'industry_events',
        supportedOperations: ['get_industry_event', 'get_all_industry_events'],
    },
    {
        query: getAllL1ProductsQuery,
        contentTypeUID: 'l1_products',
        supportedOperations: ['get_all_l1_products'],
    },
    {
        query: getAllL2ProductsQuery,
        contentTypeUID: 'l2_products',
        supportedOperations: ['get_all_l2_products'],
    },
    {
        query: getAllPodcastSeriesQuery,
        contentTypeUID: 'podcast_series',
        supportedOperations: ['get_all_podcast_series'],
    },
    {
        query: getAllPodcastsQuery,
        contentTypeUID: 'podcasts',
        supportedOperations: ['get_podcast', 'get_all_podcasts'],
    },
    {
        query: getAllProgrammingLanguagesQuery,
        contentTypeUID: 'programming_languages',
        supportedOperations: ['get_all_programming_languages'],
    },
    {
        query: getAllSpokenLanguagesQuery,
        contentTypeUID: 'spoken_languages',
        supportedOperations: ['get_all_spoken_languages'],
    },
    {
        query: getAllTechnologiesQuery,
        contentTypeUID: 'technologies',
        supportedOperations: ['get_all_technologies'],
    },
    {
        query: getAllVideoSeriesQuery,
        contentTypeUID: 'video_series',
        supportedOperations: ['get_all_video_series'],
    },
    {
        query: getAllVideosQuery,
        contentTypeUID: 'videos',
        supportedOperations: ['get_video', 'get_all_videos'],
    },
];

const updateLocalMockData = async () => {
    for (const { query, contentTypeUID, variables } of queryInfos) {
        const mockData = await fetchAllForMocks(
            query,
            contentTypeUID,
            variables
        );
        const jsonData = JSON.stringify(mockData, null, 2);
        const fileName = `./${contentTypeUID}.json`;
        const filePath = path.join(__dirname, 'apollo-data', fileName);

        try {
            fs.writeFileSync(filePath, jsonData, { flag: 'w' });
            console.log(`Successfully wrote to ${filePath}`);
        } catch (err) {
            console.error(`Failed to write to ${filePath}`, err);
        }
    }
};

updateLocalMockData();
