import { ContentItem } from '../../interfaces/content-item';
import { getAllContentItems } from '../../service/get-all-content';
import { pillCategoryToSlug } from '../../types/pill-category';
import { getSideNav } from '../../service/get-side-nav';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { Crumb } from '../../components/breadcrumbs/types';
import getRelatedContent from '../../api-requests/get-related-content';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import { determineVideoOrPodcast } from './content-page-template';

let pluralize = require('pluralize');

export const getContentPageData = async (slug: string[]) => {
    const contents: ContentItem[] = await getAllContentItems(); // TODO: Refactor

    const contentItem = contents.filter(
        content => content.slug === slug.join('/')
    )[0];

    const vidOrPod = determineVideoOrPodcast(contentItem.collectionType);
    let sideNavFilterSlug = '/' + slug.slice(0, slug.length - 1).join('/');

    //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
    if (contentItem.category === 'Code Example') {
        sideNavFilterSlug =
            '/languages/' + slug.slice(1, slug.length - 1).join('/');
    }

    if (vidOrPod) {
        if (contentItem.primaryTag?.programmingLanguage) {
            sideNavFilterSlug =
                contentItem.primaryTag.programmingLanguage.calculatedSlug;
        }
        if (contentItem.primaryTag?.l1Product) {
            sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
        }
    }

    const slugString = `${sideNavFilterSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.

    const crumbs = await getBreadcrumbsFromSlug(slugString);
    const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
    const topicContentTypeCrumb: Crumb = {
        text: pluralize(contentItem.category),
        url: `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`,
    };
    crumbs.push(topicContentTypeCrumb);
    let tertiaryNavItems = await getSideNav(sideNavFilterSlug);
    setURLPathForNavItems(tertiaryNavItems);

    const metaInfoForTopic = await getMetaInfoForTopic(sideNavFilterSlug);
    tertiaryNavItems = appendDocumentationLinkToSideNav(
        tertiaryNavItems,
        metaInfoForTopic
    );
    const topicSlug = sideNavFilterSlug;
    const topicName = metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '';

    const relatedContent = getRelatedContent(
        sideNavFilterSlug,
        contents,
        contentItem.slug
    );

    const data = {
        crumbs,
        contentItem,
        tertiaryNavItems,
        topicSlug,
        topicName,
        relatedContent,
    };

    return data;
};
