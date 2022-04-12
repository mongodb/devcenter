import { clientFactory } from '../utils/client-factory';
import getAllPodcastsFromAPI from '../requests/get-all-podcasts';
import getAllVideosFromAPI from '../requests/get-all-videos';
import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';
import { Article } from '../interfaces/article';
import { getAllArticlesFromAPI } from '../requests/get-articles';
import { ContentItem } from '../interfaces/content-item';

const client = clientFactory('ApolloREST', 'http://54.219.161.14:1337');

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcastsFromAPI(client);
    const allVideos = await getAllVideosFromAPI(client);
    const allArticles = await getAllArticlesFromAPI(client);
    const mappedPodcasts = mapPodcastsToContentItems(allPodcasts);
    const mappedVideos = mapVideosToContentItems(allVideos);
    const mappedArticles = mapArticlesToContentItems(allArticles);
    return mappedPodcasts.concat(mappedVideos).concat(mappedArticles).flat();
};

export const mapPodcastsToContentItems = (allPodcasts: Podcast[]) => {
    const items: ContentItem[] = [];
    allPodcasts.forEach((p: Podcast) => {
        const item: ContentItem = {
            category: 'Podcast',
            contentDate: p.publishDate,
            //TODO Implement logic to construct slug - preferably in Graphql Query
            slug: p.slug.startsWith('/') ? p.slug.substring(1) : p.slug,
            //TODO Implement logic to flatten primary and other tags - preferably in Graphql Query
            tags: ['tag1', 'tag2', 'tag3'],
            title: p.title,
        };
        if (p.description) {
            item.description = p.description;
        }
        if (p.thumbnailUrl) {
            item.image = { url: p.thumbnailUrl, alt: 'randomAlt' };
        }
        item.podcastFileUrl = p.podcastFileUrl;
        items.push(item);
    });
    return items;
};

export const mapVideosToContentItems = (allVideos: Video[]) => {
    const items: ContentItem[] = [];
    allVideos.forEach((v: Video) => {
        const item: ContentItem = {
            category: 'Video',
            contentDate: v.publishDate,
            //TODO Implement logic to construct slug - preferably in Graphql Query
            slug: v.slug.startsWith('/') ? v.slug.substring(1) : v.slug,
            //TODO Implement logic to flatten primary and other tags - preferably in Graphql Query
            tags: ['tag1', 'tag2', 'tag3'],
            title: v.title,
        };
        if (v.description) {
            item.description = v.description;
        }
        if (v.thumbnailUrl) {
            item.image = { url: v.thumbnailUrl, alt: 'randomAlt' };
        }
        item.videoId = v.videoId;
        items.push(item);
    });
    return items;
};

export const mapArticlesToContentItems = (allArticles: Article[]) => {
    const items: ContentItem[] = [];
    allArticles.forEach((a: Article) => {
        const item: ContentItem = {
            authors: a.authors.map(author => author.name),
            //TODO Implement logic to map content type from other tags to category
            category: 'Article',
            contentDate: a.originalPublishDate || a.publishDate,
            updateDate: a.updateDate,
            description: a.description,
            content: a.content,
            //TODO Implement logic to construct slug - preferably in Graphql Query
            slug: 'article' + a.slug,
            //TODO Implement logic to flatten primary and other tags - preferably in Graphql Query
            tags: ['tag1', 'tag2', 'tag3'],
            title: a.title,
        };
        if (a.image) {
            item.image = { url: a.image.url, alt: 'randomAlt' };
        }
        items.push(item);
    });
    return items;
};
