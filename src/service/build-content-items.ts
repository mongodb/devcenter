import { CS_PreviewVideoResponse, CS_VideoResponse } from '../interfaces/video';
import { CS_PodcastResponse } from '../interfaces/podcast';
import {
    CS_ArticleResponse,
    CS_PreviewArticleResponse,
} from '../interfaces/article';
import { Image, ImageConnection } from '../interfaces/image';
import { ContentItem } from '../interfaces/content-item';
import { Series } from '../interfaces/series';
import {
    CS_flattenTags,
    CS_flattenPrimaryTags,
    CS_mergeTags,
    CS_previewFlattenTags,
    CS_previewFlattenPrimaryTags,
} from '../utils/flatten-tags';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import { CS_setPrimaryTag, CS_previewSetPrimaryTag } from './set-primary-tag';
import { PillCategory, PillCategoryValues } from '../types/pill-category';
import { addSeriesToItem } from './add-series-to-item';
import { mapAuthor } from './get-all-authors';
import {
    CommunityEvent,
    CS_IndustryEventsResponse,
    CS_PreviewIndustryEventsResponse,
} from '../interfaces/event';
import { Tag } from '../interfaces/tag';
import {
    convertCSMarkdownToGeneralMarkdown,
    mapSEO,
} from '../utils/contentstack';
import { SEO } from '../interfaces/seo';
import { MongoDBTVShow } from '../interfaces/mongodb-tv';
import allTagsPreval from './get-all-tags.preval';
import { getAllTags } from './get-all-tags';
import { CS_PreviewOtherTags } from '../interfaces/other-tags';

export const CS_mapPodcastsToContentItems = (
    allPodcasts: CS_PodcastResponse[],
    podcastSeries: Series[]
) => {
    const items: ContentItem[] = [];
    allPodcasts.forEach((p: CS_PodcastResponse) => {
        const item: ContentItem = {
            collectionType: 'Podcast',
            category: 'Podcast',
            contentDate: p.original_publish_date,
            slug: p.slug.startsWith('/') ? p.slug.substring(1) : p.slug,
            tags: CS_flattenTags(p.other_tags),
            title: p.title,
            seo: mapSEO(p.seo) as SEO,
        };
        if (p.description) {
            item.description = p.description;
        }
        if (p.thumbnail_url) {
            item.image = { url: p.thumbnail_url, alt: 'randomAlt' };
        }
        item.podcastFileUrl = p.casted_slug;
        CS_setPrimaryTag(item, p);
        addSeriesToItem(item, 'podcast', podcastSeries);
        items.push(item);
    });
    return items.filter(item => item.title !== '');
};

const descriptionWithLinks = (description: string) => {
    let newDescription = description;
    const matches = description.match(/(https?:\/\/[^\s]+)/g);
    matches?.forEach(match => {
        const replaceText =
            '<a target="_blank" rel="noreferrer">' + match + '</a>';
        newDescription = newDescription.replace(match, replaceText);
    });
    return newDescription;
};

export const slugify = (text: string) => {
    const slug = text.replace(/[^a-zA-Z0-9]+/g, '-');
    return slug.toLowerCase();
};

export const mapMongoDBTVShowsToContentItems = async (
    allMongoDBTVShows: MongoDBTVShow[],
    isRuntime: boolean
) => {
    let mappedMongodbTVShows: ContentItem[] = [];
    // we can leverage preval if it's runtime.
    const allTags = isRuntime ? allTagsPreval : await getAllTags();
    if (isRuntime) console.log('PREVAL TAGS');
    const tagMap = new Map<string, Tag>();
    allTags.forEach(tag => {
        tagMap.set(tag.tagName.toLowerCase(), {
            name: tag.tagName,
            type: tag.category,
            slug: tag.slug,
        });
    });
    mappedMongodbTVShows = allMongoDBTVShows.map((show: MongoDBTVShow) => {
        const tags: Tag[] = [];
        show.tags.forEach(tag => {
            const correspondingTag = tagMap.get(tag);
            if (correspondingTag) {
                tags.push(correspondingTag);
            }
        });
        return {
            collectionType: 'Video',
            image: { url: show.thumbnail },
            category: 'Video',
            videoType: 'MongoDB TV',
            contentDate: [show.since, show.till],
            description: descriptionWithLinks(show.description),
            slug: '/videos/' + slugify(show.title),
            tags,
            title: show.title,
            videoId: show.videoId,
        };
    }) as ContentItem[];
    return mappedMongodbTVShows;
};

export const CS_mapVideosToContentItems = (
    allVideos: CS_VideoResponse[],
    videoSeries: Series[]
) => {
    const items: ContentItem[] = [];
    allVideos.forEach((v: CS_VideoResponse) => {
        const item: ContentItem = {
            collectionType: 'Video',
            category: 'Video',
            contentDate: v.original_publish_date,
            slug: v.slug.startsWith('/') ? v.slug.substring(1) : v.slug,
            tags: CS_flattenTags(v.other_tags),
            title: v.title,
            seo: mapSEO(v.seo) as SEO,
            relevantLinks: v?.relevant_links || '',
        };

        if (v.description) {
            item.description = v.description;
        }

        item.image = {
            url: getPlaceHolderImage(v.thumbnailUrl),
            alt: 'randomAlt',
        };

        item.videoId = v.video_id;
        CS_setPrimaryTag(item, v);
        addSeriesToItem(item, 'video', videoSeries);
        items.push(item);
    });
    return items.filter(item => item.title !== '');
};

const eventContentTypeTag = {
    name: 'Event',
    slug: '/events',
    type: 'ContentType',
} as Tag;

const mapImage = (
    image: ImageConnection,
    event: CS_IndustryEventsResponse
): Image => {
    const img = image.edges.length > 0 ? image.edges[0] : null;
    if (img) {
        return {
            url: img.node.url,
            alt: img.node.description
                ? img.node.description
                : 'MongoDB Event Image',
            city: event.address.city || null,
        };
    } else {
        return {
            url: '',
            alt: 'MongoDB Event Image',
            city: event.address.city || null,
        };
    }
};

export const CS_mapIndustryEventToContentItem = (
    event: CS_IndustryEventsResponse
): ContentItem => ({
    collectionType: 'Event',
    category: 'Event',
    subCategory: 'Industry Event',
    image: mapImage(event.imageConnection, event),
    contentDate: [event.start_time, event.end_time],
    description: event.description,
    slug: event.calculated_slug,
    tags: CS_flattenTags(event.other_tags).concat(eventContentTypeTag),
    title: event.title,
    location: event.address.location,
    city: event.address.city || null,
    state: event.address.state || null,
    country: event.address.country || null,
    eventSetup: event.type,
    authors: event.authorsConnection.edges.map(({ node }) => mapAuthor(node)),
    content: event.content,
    registrationLink: event.registration_url,
    virtualLink: event.virtual_meetup_url,
    virtualLinkText: event.virtual_meetup_url_text,
    relatedContent: [],
});

export const mapEventsToContentItems = (
    allCommunityEvents: CommunityEvent[],
    allIndustryEvents: CS_IndustryEventsResponse[]
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
        CS_mapIndustryEventToContentItem
    );

    return [...mappedCommunityEvents, ...mappedIndustryEvents];
};

export const CS_mapArticlesToContentItems = (
    allArticles: CS_ArticleResponse[],
    articleSeries: Series[]
) => {
    const items: ContentItem[] = [];
    /*
    very important - filter out articles that have no calculated slug
     */
    const filteredArticles = allArticles.filter(a => a.calculated_slug);
    filteredArticles.forEach((a: CS_ArticleResponse) => {
        const updated_at =
            !a.strapi_updated_at ||
            new Date(a.system.updated_at) > new Date('2023-06-12') // This should be set to the date we migrate from Strapi to ContentStack
                ? a.system.updated_at
                : a.strapi_updated_at;
        const authors = a.authorsConnection.edges.map(({ node }) =>
            mapAuthor(node)
        );
        const item: ContentItem = {
            collectionType: 'Article',
            authors,
            category: a.other_tags.content_typeConnection.edges[0].node.title,
            contentDate:
                a.original_publish_date || a.system.publish_details.time,
            updateDate: updated_at,
            description: a.description,
            content: !a.strapi_updated_at
                ? convertCSMarkdownToGeneralMarkdown(a.content)
                : a.content,
            slug: a.calculated_slug.startsWith('/')
                ? a.calculated_slug.substring(1)
                : a.calculated_slug,
            tags: CS_mergeTags(
                CS_flattenTags(a.other_tags),
                CS_flattenPrimaryTags(a.primary_tag)
            ),
            title: a.title,
            codeType: a.other_tags.code_type,
            githubUrl: a.other_tags.github_url,
            liveSiteUrl: a.other_tags.livesite_url,
            seo: mapSEO(a.seo) as SEO,
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
    return items.filter(
        item =>
            PillCategoryValues.includes(
                item.category.replace('*', '') as PillCategory
            ) // The replace is necessart for mocking.
    );
};

// PREVIEW

export const CS_previewMapPreviewArticleToContentItem = (
    a: CS_PreviewArticleResponse
): ContentItem => {
    const updated_at =
        !a.strapi_updated_at || new Date(a.updated_at) > new Date('2023-06-12') // This should be set to the date we migrate from Strapi to ContentStack
            ? a.updated_at
            : a.strapi_updated_at;
    const authors = a.authors.map(({ title, image, job_title, ...rest }) => ({
        name: title,
        title: job_title,
        image,
        ...rest,
    }));

    const { code_type, github_url, livesite_url } = a.other_tags;

    const contentItem: ContentItem = {
        collectionType: 'Article',
        authors,
        category: a.other_tags.content_type[0].title,
        contentDate: a.original_publish_date || a.publish_details[0].time,
        updateDate: updated_at,
        description: a.description,
        content: !a.strapi_updated_at
            ? convertCSMarkdownToGeneralMarkdown(a.content)
            : a.content,
        slug: a.calculated_slug.startsWith('/')
            ? a.calculated_slug.substring(1)
            : a.calculated_slug,
        tags: CS_mergeTags(
            CS_previewFlattenTags(a.other_tags),
            CS_previewFlattenPrimaryTags(a.primary_tag.tag)
        ),
        title: a.title,
        codeType: code_type,
        githubUrl: github_url,
        liveSiteUrl: livesite_url,
        seo: mapSEO(a.seo) as SEO,
        image: {
            url: a.image.url,
            alt: a.image.description || '',
        },
    };

    if (a.image) {
        contentItem.image = {
            url: a.image.url,
            alt: a.image.description || '',
        };
    }

    return contentItem;
};

export const CS_previewMapIndustryEventToContentItem = (
    event: CS_PreviewIndustryEventsResponse
): ContentItem => {
    const authors = event.authors.map(
        ({ title, image, job_title, ...rest }) => ({
            name: title,
            title: job_title,
            image,
            ...rest,
        })
    );

    return {
        collectionType: 'Event',
        category: 'Event',
        subCategory: 'Industry Event',
        ...(event.image
            ? {
                  image: {
                      url: event.image?.url,
                      alt: event.image?.description || '',
                  },
              }
            : {}),
        contentDate: [event.start_time, event.end_time],
        description: event.description,
        slug: event.calculated_slug,
        tags: CS_previewFlattenTags(event.other_tags).concat(
            eventContentTypeTag
        ),
        title: event.title,
        location: event.address.location,
        city: event.address.city || null,
        state: event.address.state || null,
        country: event.address.country || null,
        eventSetup: event.type,
        authors,
        content: event.content,
        registrationLink: event.registration_url,
        virtualLink: event.virtual_meetup_url,
        virtualLinkText: event.virtual_meetup_url_text,
        relatedContent: [],
    };
};

export const CS_previewMapVideoToContentItem = (
    v: CS_PreviewVideoResponse
): ContentItem => {
    const otherTags: CS_PreviewOtherTags = {
        ...v.other_tags,
    };
    const l1Product = v.l1_product?.at(0);
    if (l1Product) {
        otherTags.l1_product = [l1Product];
    }
    const l2Product = v.l2_product?.at(0);
    if (l2Product) {
        otherTags.l2_product = [l2Product];
    }
    const programmingLanguages = v.programming_languages;
    if (programmingLanguages) {
        otherTags.programming_languages = programmingLanguages;
    }
    const technologies = v.technologies;
    if (technologies) {
        otherTags.technologies = technologies;
    }

    const item: ContentItem = {
        collectionType: 'Video',
        category: 'Video',
        contentDate: v.original_publish_date,
        slug: v.slug.startsWith('/') ? v.slug.substring(1) : v.slug,
        tags: CS_previewFlattenTags(otherTags),
        title: v.title,
        seo: mapSEO(v.seo) as SEO,
        relevantLinks: v?.relevant_links || '',
    };

    if (v.description) {
        item.description = v.description;
    }

    item.image = {
        url: getPlaceHolderImage(v.thumbnail_url),
        alt: 'randomAlt',
    };

    item.videoId = v.video_id;
    CS_previewSetPrimaryTag(item, v);
    return item;
};
