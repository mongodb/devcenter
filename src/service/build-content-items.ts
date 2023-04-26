import { Video } from '../interfaces/video';
import { Podcast } from '../interfaces/podcast';
import { CS_ArticleRepsonse, Article } from '../interfaces/article';
import { ContentItem } from '../interfaces/content-item';
import { Series } from '../interfaces/series';
import { flattenTags, CS_flattenTags } from '../utils/flatten-tags';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import { setPrimaryTag } from './set-primary-tag';
import { PillCategory, PillCategoryValues } from '../types/pill-category';
import { addSeriesToItem } from './add-series-to-item';
import { mapAuthor } from './get-all-authors';
import { CommunityEvent, IndustryEvent } from '../interfaces/event';
import { Tag } from '../interfaces/tag';
import { IndustryEventRelatedContentFromCMS } from '../interfaces/event';

// STRAPI

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
            tags: flattenTags(p.otherTags),
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
            tags: flattenTags(v.otherTags),
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
    const filteredArticles = allArticles.filter(a => a.calculatedSlug);
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

const eventContentTypeTag = {
    name: 'Event',
    slug: '/events',
    type: 'ContentType',
} as Tag;

const mapEventsRelatedContent = (
    relatedContent: IndustryEventRelatedContentFromCMS
) => {
    const categoryMapper = {
        newVideos: 'Video',
        podcasts: 'Podcast',
        newArticles: 'Article',
        industryEvents: 'Industry Event',
    } as { [field: string]: PillCategory };

    const content = [];

    for (const item in relatedContent) {
        content.push(
            ...relatedContent[item].map(piece => ({
                title: piece.title,
                contentDate: piece?.originalPublishDate ||
                    piece?.published_at || [piece?.start_time, piece?.end_time],
                slug: piece?.calculated_slug || piece?.slug,
                category: categoryMapper[item],
            }))
        );
    }

    return content;
};

export const mapIndustryEventToContentItem = (event: IndustryEvent) =>
    ({
        collectionType: 'Event',
        category: 'Event',
        subCategory: 'Industry Event',
        image: {
            url: event?.image?.url || '',
            alt: event?.image?.alt || 'MongoDB Event Image',
            city: event.city || null,
        },
        contentDate: [event.start_time, event.end_time],
        description: event.description,
        slug: event.calculated_slug,
        tags: flattenTags(event.otherTags).concat(eventContentTypeTag),
        title: event.title,
        location: event.location,
        city: event.city || null,
        state: event.state || null,
        country: event.country || null,
        eventSetup: event.type,
        authors: event.authors,
        content: event.content,
        registrationLink: event.registration_url,
        virtualLink: event.virtual_meetup_url,
        virtualLinkText: event.virtual_meetup_url_text,
        relatedContent: mapEventsRelatedContent(event.related_content),
    } as ContentItem);

export const mapEventsToContentItems = (
    allCommunityEvents: CommunityEvent[],
    allIndustryEvents: IndustryEvent[]
) => {
    const mappedCommunityEvents = allCommunityEvents.map(
        (event: CommunityEvent) => ({
            collectionType: 'Event',
            category: 'Event',
            subCategory: 'User Group Meetup',
            contentDate: [event.start_time, event.end_time],
            description: event.description,
            slug: event.slug,
            tags: event.tags.concat(eventContentTypeTag),
            title: event.title,
            location: event.location,
            coordinates: event.coordinates,
            eventSetup: event.event_setup,
        })
    ) as ContentItem[];

    const mappedIndustryEvents = allIndustryEvents.map(
        mapIndustryEventToContentItem
    );

    return [...mappedCommunityEvents, ...mappedIndustryEvents];
};

// CONTENTSTACK

export const CS_mapArticlesToContentItems = (
    allArticles: CS_ArticleRepsonse[],
    articleSeries: Series[]
) => {
    const items: ContentItem[] = [];
    /*
    very important - filter out articles that have no calculated slug
     */
    const filteredArticles = allArticles.filter(a => a.calculated_slug);
    filteredArticles.forEach((a: CS_ArticleRepsonse) => {
        const updated_at =
            !a.strapi_updated_at ||
            new Date(a.system.updated_at) > new Date('2023-04-19') // This should be set to the date we migrate from Strapi to ContentStack
                ? a.system.updated_at
                : a.strapi_updated_at;
        const authors = a.authorsConnection.edges.map(({ node }) =>
            mapAuthor(node)
        );
        const item: ContentItem = {
            collectionType: 'Article',
            authors,
            category: a.other_tags.content_typeConnection.edges[0].node.title,
            contentDate: a.original_publish_date, // || a.published_at,
            updateDate: updated_at,
            description: a.description,
            content: a.content,
            slug: a.calculated_slug.startsWith('/')
                ? a.calculated_slug.substring(1)
                : a.calculated_slug,
            tags: CS_flattenTags(a.other_tags),
            title: a.title,
            codeType: a.other_tags.code_type,
            githubUrl: a.other_tags.github_url,
            liveSiteUrl: a.other_tags.livesite_url,
            seo: a.seo,
        };
        const image = a.imageConnection.edges[0];
        if (image) {
            item.image = {
                url: image.node.url,
                alt: image.node.description || '',
            };
        }
        addSeriesToItem(item, 'article', articleSeries);
        items.push(item);
    });

    return items.filter(item => PillCategoryValues.includes(item.category));
};
