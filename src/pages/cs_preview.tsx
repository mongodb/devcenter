/* eslint @next/next/no-sync-scripts: 0 */
import type { NextPage } from 'next';
import Stack from '../utils/stack';
import allContentPreval from '../service/get-all-content.preval';
import { CS_PreviewArticleResponse } from '../interfaces/article';
import { ContentItem } from '../interfaces/content-item';
import { mapPreviewArticleToContentItem } from '../service/build-content-items';
import { getBreadcrumbsFromSlug } from '../components/breadcrumbs/utils';
import { PillCategory, pillCategoryToSlug } from '../types/pill-category';
import pluralize from 'pluralize';
import { getURLPath, setURLPathForNavItems } from '../utils/format-url-path';
import { hasPrimaryTag } from '../page-templates/content-page/util';
import { Crumb } from '../components/breadcrumbs/types';
import { getSideNav } from '../service/get-side-nav';
import { getMetaInfoForTopic } from '../service/get-meta-info-for-topic';
import { appendDocumentationLinkToSideNav } from '../utils/page-template-helpers';
import { getRelatedContent } from '../utils/get-related-content';
import { Tag } from '../interfaces/tag';
import { TagType } from '../types/tag-type';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import ContentPageTemplate from '../page-templates/content-page/content-page-template';

// Assumes that other category always carries a primary tag
const categoryWithoutPrimaryTagToURL = (category: PillCategory) => {
    if (category === 'Podcast') {
        return 'https://podcasts.mongodb.com/';
    }

    if (category === 'Video') {
        return getURLPath('videos');
    }

    if (category === 'Event' || category === 'Industry Event') {
        return getURLPath('events');
    }
};

const relation_uids = [
    'authors',
    'primary_tag.tag',
    'other_tags.l1_product',
    'other_tags.l2_product',
    'other_tags.expertise_level',
    'other_tags.content_type',
    'other_tags.technologies',
    'other_tags.programming_languages',
    'other_tags.spoken_language',
    'other_tags.author_type',
];

interface PreviewContentPageProps {
    crumbs: Crumb[];
    topic: Tag;
    contentItem: ContentItem;
    relatedContent: ContentItem[];
    tertiaryNavItems: TertiaryNavItem[];
    slugString: string;
}

const ContentPage: NextPage<PreviewContentPageProps> = ({
    contentItem,
    crumbs,
    topic,
    tertiaryNavItems,
    relatedContent,
}) => {
    return (
        <>
            <script src="https://unpkg.com/@contentstack/live-preview-utils@^1.2/dist/index.js"></script>
            <script>ContentstackLivePreview.init();</script>
            {contentItem && (
                <ContentPageTemplate
                    crumbs={crumbs}
                    topic={topic}
                    contentItem={contentItem}
                    tertiaryNavItems={tertiaryNavItems}
                    relatedContent={relatedContent}
                    previewMode={true}
                />
            )}
        </>
    );
};

export default ContentPage;

export const getServerSideProps = async (context: any) => {
    // return 404 page when accessing preview on production app
    // because we do not want to expose the preview to the public
    if (process.env.APP_ENV === 'production') return { notFound: true };

    const { query } = context;
    const { live_preview, content_type_uid, entry_uid } = query;
    if (live_preview && content_type_uid && entry_uid) {
        console.log('LIVE PREVIEWING');
        Stack.livePreviewQuery(query);

        const csQuery = Stack.ContentType(content_type_uid)
            .Entry(entry_uid)
            .includeReference(relation_uids);
        const entry: CS_PreviewArticleResponse = (
            await csQuery.fetch()
        ).toJSON();

        let contentItem: ContentItem;

        if (
            entry.calculated_slug.startsWith('/videos/') ||
            entry.calculated_slug.startsWith('/podcasts/')
        ) {
            return { props: {} };
        } else if (entry.calculated_slug.startsWith('/events/')) {
            return { props: {} };
        } else {
            // Regular Article
            contentItem = mapPreviewArticleToContentItem(entry);
            // console.log(contentItem);
        }
        if (!contentItem) return null;

        const slug = contentItem.slug.split('/');

        const contentItemHasPrimaryTag = hasPrimaryTag(contentItem);
        const isEventContent = contentItem.collectionType === 'Event';
        const isMongoDBTVContent = contentItem.videoType === 'MongoDB TV';
        let topicSlug = '/' + slug.slice(0, slug.length - 1).join('/');

        //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
        if (contentItem.category === 'Code Example') {
            topicSlug =
                '/languages/' + slug.slice(1, slug.length - 1).join('/');
        }

        if (isEventContent || isMongoDBTVContent) {
            // Events and MongoDBTV Shows do not come with a "primary tag" fields, so a search for "L1Product" or "ProgrammingLanguage" needs to be done in the standard tags field
            const eventTags = contentItem.tags.find(
                tag =>
                    tag.type === 'L1Product' ||
                    tag.type === 'ProgrammingLanguage'
            );

            if (eventTags) {
                topicSlug = eventTags.slug;
            }
        } else if (
            contentItem.collectionType === 'Video' ||
            contentItem.collectionType === 'Podcast'
        ) {
            if (contentItem.primaryTag?.programmingLanguage) {
                topicSlug =
                    contentItem.primaryTag.programmingLanguage.calculatedSlug;
            }
            if (contentItem.primaryTag?.l1Product) {
                topicSlug = contentItem.primaryTag.l1Product.calculatedSlug;
            }
        }

        const slugString = `${topicSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.

        const crumbs = getBreadcrumbsFromSlug(slugString);
        const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
        const topicContentTypeCrumb: Crumb = {
            text: pluralize(contentItem.category),
            url: contentItemHasPrimaryTag
                ? `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`
                : categoryWithoutPrimaryTagToURL(contentItem.category),
        };
        crumbs.push(topicContentTypeCrumb);

        // In the rare event an item (e.g., event) has no tags, set tertiary nav to empty to prevent parent and first child titles both displaying "Events"

        let tertiaryNavItems = contentItemHasPrimaryTag
            ? getSideNav(topicSlug, allContentPreval)
            : [];
        setURLPathForNavItems(tertiaryNavItems);

        const metaInfoForTopic = getMetaInfoForTopic(topicSlug);

        tertiaryNavItems = appendDocumentationLinkToSideNav(
            tertiaryNavItems,
            metaInfoForTopic
        );

        const relatedContent = isEventContent
            ? contentItem.relatedContent
            : getRelatedContent(topicSlug, contentItem.slug);

        const topic: Tag = {
            name: metaInfoForTopic?.tagName || '',
            type: metaInfoForTopic?.category as TagType,
            slug: topicSlug,
        };
        console.log(topic);

        return {
            props: {
                crumbs,
                contentItem,
                tertiaryNavItems,
                topic,
                relatedContent,
            },
        };
    } else {
        return { props: {} };
    }
};
