import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';
import { Article } from '../interfaces/article';
import { getAllArticlesFromAPI } from '../api-requests/get-articles';
import { ContentItem } from '../interfaces/content-item';
import { Series } from '../interfaces/series';
import { STRAPI_CLIENT } from '../config/api-client';
import { getAllArticleSeries } from './get-all-article-series';
import { getAllVideoSeries } from './get-all-video-series';
import { getAllPodcastSeries } from './get-all-podcast-series';
import { flattenTags } from '../utils/flatten-tags';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import { getAllVideos } from './get-all-videos';
import { getAllPodcasts } from './get-all-podcasts';
import { setPrimaryTag } from './set-primary-tag';
import { PillCategoryValues } from '../types/pill-category';
import { getAllFeatured } from './get-all-featured';
import { addSeriesToItem } from './add-series-to-item';

export const getAllContentItems: () => Promise<ContentItem[]> = async () => {
    const allPodcasts = await getAllPodcasts();
    const allVideos = await getAllVideos();
    const allArticles = await getAllArticlesFromAPI(STRAPI_CLIENT);
    const allFeatured = await getAllFeatured();
    /*
    series
     */
    const podcastSeries = await getAllPodcastSeries();
    const videoSeries = await getAllVideoSeries();
    const articleSeries = await getAllArticleSeries();
    const mappedPodcasts = mapPodcastsToContentItems(
        allPodcasts,
        podcastSeries,
        allFeatured.podcasts
    );
    const mappedVideos = mapVideosToContentItems(
        allVideos,
        videoSeries,
        allFeatured.videos
    );
    const mappedArticles = mapArticlesToContentItems(
        allArticles,
        articleSeries,
        allFeatured.articles
    );

    return mappedPodcasts.concat(mappedVideos).concat(mappedArticles).flat();
};

export const mapPodcastsToContentItems = (
    allPodcasts: Podcast[],
    podcastSeries: Series[],
    featured: string[]
) => {
    const items: ContentItem[] = [];
    allPodcasts.forEach((p: Podcast) => {
        const item: ContentItem = {
            collectionType: 'Podcast',
            category: 'Podcast',
            contentDate: p.publishDate,
            slug: p.slug.startsWith('/') ? p.slug.substring(1) : p.slug,
            tags: flattenTags([p.otherTags]),
            title: p.title,
            featured: featured.includes(p.title),
            SEO: {
                title: p.title,
                canonicalUrl: p.SEO ? p.SEO.canonicalUrl : null,
                metaDescription: p.SEO
                    ? p.SEO.metaDescription
                    : 'This is a test podcast meta description',
                og: p.SEO ? p.SEO.og : null,
            },
        };
        if (p.description) {
            item.description = p.description;
        }
        if (p.thumbnailUrl) {
            item.image = { url: p.thumbnailUrl, alt: 'randomAlt' };
        }
        item.podcastFileUrl = p.casted_slug;
        setPrimaryTag(item, p);
        addSeriesToItem(item, 'podcast', podcastSeries);
        items.push(item);
    });
    return items.filter(item => item.title !== '');
};

export const mapVideosToContentItems = (
    allVideos: Video[],
    videoSeries: Series[],
    featured: string[]
) => {
    const items: ContentItem[] = [];
    allVideos.forEach((v: Video) => {
        const item: ContentItem = {
            collectionType: 'Video',
            category: 'Video',
            contentDate: v.publishDate,
            slug: v.slug.startsWith('/') ? v.slug.substring(1) : v.slug,
            tags: flattenTags([v.otherTags]),
            title: v.title,
            featured: featured.includes(v.title),
            SEO: {
                title: v.title,
                canonicalUrl: v.SEO ? v.SEO.canonicalUrl : null,
                metaDescription: v.SEO
                    ? v.SEO.metaDescription
                    : 'This is a test video meta description',
                og: v.SEO ? v.SEO.og : null,
            },
        };
        if (v.description) {
            item.description = v.description;
        }

        item.image = {
            url: getPlaceHolderImage(v.thumbnailUrl),
            alt: 'randomAlt',
        };

        item.videoId = v.videoId;
        setPrimaryTag(item, v);
        addSeriesToItem(item, 'video', videoSeries);
        items.push(item);
    });
    return items.filter(item => item.title !== '');
};

export const mapArticlesToContentItems = (
    allArticles: Article[],
    articleSeries: Series[],
    featured: string[]
) => {
    const items: ContentItem[] = [];
    /*
    very important - filter out articles that have no calculated slug
     */
    const filteredArticles = allArticles;

    filteredArticles.forEach((a: Article) => {
        const item: ContentItem = {
            collectionType: 'Article',
            authors: a.authors,
            category: a.otherTags[0].contentType.contentType,
            contentDate: a.originalPublishDate || a.publishDate,
            updateDate: a.updateDate,
            description: a.description,
            content: a.content,
            slug: a.calculatedSlug.startsWith('/')
                ? a.calculatedSlug.substring(1)
                : a.calculatedSlug,
            tags: flattenTags(a.otherTags),
            title: a.title,
            featured: featured.includes(a.title),
            codeType: a.otherTags[0].codeType,
            githubUrl: a.otherTags[0].githubUrl,
            liveSiteUrl: a.otherTags[0].liveSiteUrl,
            SEO: {
                title: a.title,
                canonicalUrl: a.SEO ? a.SEO.canonicalUrl : null,
                metaDescription: a.SEO
                    ? a.SEO.metaDescription
                    : 'This is a test article meta description',
                og: a.SEO ? a.SEO.og : null,
            },
        };
        if (a.image) {
            item.image = { url: a.image.url, alt: a.image.alt || 'random alt' };
        }
        addSeriesToItem(item, 'article', articleSeries);
        items.push(item);
    });

    return items.filter(item => PillCategoryValues.includes(item.category));
};
