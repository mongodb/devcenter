import { Podcast } from '../interfaces/podcast';
import { Video } from '../interfaces/video';
import { Article } from '../interfaces/article';
import { ContentItem } from '../interfaces/content-item';
import { Series } from '../interfaces/series';
import { flattenTags } from '../utils/flatten-tags';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import { setPrimaryTag } from './set-primary-tag';
import { PillCategoryValues } from '../types/pill-category';
import { addSeriesToItem } from './add-series-to-item';
import { CommunityEvent } from '../interfaces/community-event';

export const mapPodcastsToContentItems = (
    allPodcasts: Podcast[],
    podcastSeries: Series[]
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
            seo: p.seo,
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
    videoSeries: Series[]
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
            seo: v.seo,
            relevantLinks: v?.relevantLinks || '',
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
    articleSeries: Series[]
) => {
    const items: ContentItem[] = [];
    /*
    very important - filter out articles that have no calculated slug
     */
    const filteredArticles = allArticles.filter(
        a => a['calculatedSlug'] != null
    );
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
            codeType: a.otherTags[0].codeType,
            githubUrl: a.otherTags[0].githubUrl,
            liveSiteUrl: a.otherTags[0].liveSiteUrl,
            seo: a.seo,
        };
        if (a.image) {
            item.image = { url: a.image.url, alt: a.image.alt || 'random alt' };
        }
        addSeriesToItem(item, 'article', articleSeries);
        items.push(item);
    });

    return items.filter(item => PillCategoryValues.includes(item.category));
};

const util = require('util');

export const mapIndustryEventToContentItem = (evt: any) => {
    // console.log(util.inspect(evt.otherTags, {showHidden: false, depth: null, colors: true}));
    return {
        collectionType: 'Event',
        category: 'Event',
        eventType: evt.type,
        // this might be a different field, double check with Harika
        authors: evt.authors,
        content: evt.content,
        slug: evt.calculatedSlug,
        title: evt.title,
        // TODO: do all the below need default values, or will they come null or empty string from response?
        startTime: evt.start_time,
        endTime: evt.end_time,
        location: evt.location,
        tags: flattenTags([evt.otherTags]),
        // TODO: not in current response
        registrationLink: evt.registration_url || '',
        virtualLink: evt.virtual_meetup_url || '',
        virtualLinkText: evt.virtual_meetup_url_text || '',
    };
};

export const mapCommunityEventsToContentItems = (
    allCommunityEvents: CommunityEvent[]
) => {
    return allCommunityEvents.map((event: CommunityEvent) => ({
        collectionType: 'Event',
        category: 'User Group Meetup',
        // content date will be used for sorting for featured
        // guess for cards we need to create another field rather than manipulating content Date since we need ContentDate for sorting
        contentDate: event.start_time,
        description: event.description,
        slug: event.slug,
        tags: event.tags,
        title: event.title,
        // TODO to be added to content type
        // eventSetup: event.event_setup,
        // location: event.location,
        // coordinates: event.coordinates
        // start_time: event.start_time
        // end_time: event.end_time
    })) as ContentItem[];
};
