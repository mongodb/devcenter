import getAllPodcastsFromAPI from '../api-requests/get-all-podcasts';
import getAllVideosFromAPI from '../api-requests/get-all-videos';
import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';
import { Article } from '../interfaces/article';
import { getAllArticlesFromAPI } from '../api-requests/get-articles';
import { ContentItem } from '../interfaces/content-item';
import { Series } from '../interfaces/series';
import { addSeriesToItem } from './add-series-to-item';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { flattenTags } from '../utils/flatten-tags';
import { MOCK_PODCAST_TAGS, MOCK_VIDEO_TAGS } from '../mockdata/mock-tags';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcastsFromAPI(STRAPI_CLIENT);
    const allVideos = await getAllVideosFromAPI(STRAPI_CLIENT);
    const allArticles = await getAllArticlesFromAPI(STRAPI_CLIENT);
    /*
    series
     */
    const podcastSeries = await getAllPodcastSeries();
    const videoSeries = await getAllVideoSeries();
    const articleSeries = await getAllArticleSeries();
    const mappedPodcasts = mapPodcastsToContentItems(
        allPodcasts,
        podcastSeries
    );
    const mappedVideos = mapVideosToContentItems(allVideos, videoSeries);
    const mappedArticles = mapArticlesToContentItems(
        allArticles,
        articleSeries
    );

    return mappedPodcasts.concat(mappedVideos).concat(mappedArticles).flat();
};

export const mapPodcastsToContentItems = (
    allPodcasts: Podcast[],
    podcastSeries: Series[]
) => {
    const items: ContentItem[] = [];
    allPodcasts.forEach((p: Podcast) => {
        const item: ContentItem = {
            category: 'Podcast',
            contentDate: p.publishDate,
            slug: p.slug.startsWith('/') ? p.slug.substring(1) : p.slug,
            //TODO Implement logic to flatten primary and other tags - preferably in Graphql Query
            tags: MOCK_PODCAST_TAGS,
            title: p.title,
            featured: false,
        };
        if (p.description) {
            item.description = p.description;
        }
        if (p.thumbnailUrl) {
            item.image = { url: p.thumbnailUrl, alt: 'randomAlt' };
        }
        item.podcastFileUrl = p.podcastFileUrl;
        //addSeriesToItem(item, 'podcast', podcastSeries);
        items.push(item);
    });
    return items;
};

export const mapVideosToContentItems = (
    allVideos: Video[],
    videoSeries: Series[]
) => {
    const items: ContentItem[] = [];
    allVideos.forEach((v: Video) => {
        const item: ContentItem = {
            category: 'Video',
            contentDate: v.publishDate,
            slug: v.slug.startsWith('/') ? v.slug.substring(1) : v.slug,
            //TODO Implement logic to flatten primary and other tags - preferably in Graphql Query
            tags: MOCK_VIDEO_TAGS,
            title: v.title,
            featured: false,
        };
        if (v.description) {
            item.description = v.description;
        }
        if (v.thumbnailUrl) {
            item.image = { url: v.thumbnailUrl, alt: 'randomAlt' };
        }
        item.videoId = v.videoId;
        //addSeriesToItem(item, 'video', videoSeries);
        items.push(item);
    });
    return items;
};

export const mapArticlesToContentItems = (
    allArticles: Article[],
    articleSeries: Series[]
) => {
    const items: ContentItem[] = [];
    /*
    very important - filter out articles that have no calculated slug
     */
    const filteredArticles = allArticles;

    filteredArticles.forEach((a: Article) => {
        const item: ContentItem = {
            authors: a.authors,
            /*
            very important - some times we see content type as video and podcast in article type of data - set their category to 'Article'
             */
            category:
                a.otherTags[0].contentType.contentType === 'Video' ||
                a.otherTags[0].contentType.contentType === 'Podcast'
                    ? 'Article'
                    : a.otherTags[0].contentType.contentType,
            contentDate: a.originalPublishDate || a.publishDate,
            updateDate: a.updateDate,
            description: a.description,
            content: a.content,
            slug: a.calculatedSlug.startsWith('/')
                ? a.calculatedSlug.substring(1)
                : a.calculatedSlug,
            tags: flattenTags(a.otherTags),
            title: a.title,
            featured: false,
        };
        if (a.image) {
            item.image = { url: a.image.url, alt: a.image.alt || 'random alt' };
        }
        //addSeriesToItem(item, 'article', articleSeries);
        items.push(item);
    });
    return items;
};
