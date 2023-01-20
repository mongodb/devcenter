import * as Sentry from '@sentry/nextjs';
import { ContentItem } from '../../interfaces/content-item';
import { pillCategoryToSlug } from '../../types/pill-category';
import { getSideNav } from '../../service/get-side-nav';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getRelatedContent } from '../../utils/get-related-content';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { Crumb } from '../../components/breadcrumbs/types';
import { appendDocumentationLinkToSideNav } from '../../utils/page-template-helpers';
import { getContentItemFromSlug } from '../../service/get-content-by-slug';
import allContentPreval from '../../service/get-all-content.preval';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

export const getContentPageData = async (slug: string[]) => {
    const slugStr = slug.join('/');
    let contentItem: ContentItem | null;

    try {
        contentItem = await getContentItemFromSlug(slugStr);
    } catch (e) {
        Sentry.captureException(e);
        // Fallback - Pull from pre-evaluated / static data.
        contentItem = allContentPreval.filter(
            content => content.slug === slugStr
        )[0];
    }
    if (!contentItem) return null;

    const isEventContent = contentItem.collectionType === 'Event';
    let sideNavFilterSlug = '/' + slug.slice(0, slug.length - 1).join('/');

    //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
    if (contentItem.category === 'Code Example') {
        sideNavFilterSlug =
            '/languages/' + slug.slice(1, slug.length - 1).join('/');
    }

    if (
        contentItem.collectionType === 'Video' ||
        contentItem.collectionType === 'Podcast'
    ) {
        if (contentItem.primaryTag?.programmingLanguage) {
            sideNavFilterSlug =
                contentItem.primaryTag.programmingLanguage.calculatedSlug;
        }
        if (contentItem.primaryTag?.l1Product) {
            sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
        }
    } else if (isEventContent) {
        // Events do not come with a "primary tag" fields, so a search for "L1Product" or "ProgrammingLanguage" needs to be done in the standard tags field
        const eventTags = contentItem.tags.find(
            tag =>
                tag.type === 'L1Product' || tag.type === 'ProgrammingLanguage'
        );

        if (eventTags) {
            sideNavFilterSlug = eventTags.slug;
        }
    }

    const slugString = `${sideNavFilterSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.

    const crumbs = getBreadcrumbsFromSlug(slugString);
    const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
    const topicContentTypeCrumb: Crumb = {
        text: pluralize(contentItem.category),
        url: `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`,
    };

    crumbs.push(topicContentTypeCrumb);

    // In the rare event an event has no tags, set tertiary nav to empty to prevent parent and first child titles both displaying "Events"
    let tertiaryNavItems =
        sideNavFilterSlug === '/events'
            ? []
            : getSideNav(sideNavFilterSlug, allContentPreval);
    setURLPathForNavItems(tertiaryNavItems);

    const metaInfoForTopic = getMetaInfoForTopic(sideNavFilterSlug);

    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );

    const relatedContent = isEventContent
        ? contentItem.relatedContent
        : getRelatedContent(sideNavFilterSlug, contentItem.slug);

    const data = {
        crumbs,
        contentItem,
        tertiaryNavItems,
        topicSlug: sideNavFilterSlug,
        topicName: metaInfoForTopic?.tagName || '',
        relatedContent,
    };

    return data;
};
