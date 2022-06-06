import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate, {
    determineVideoOrPodcast,
} from '../../components/main-content-page/content-page-template';
import { getAllContentItems } from '../../service/get-all-content';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { pillCategoryToSlug } from '../../types/pill-category';
import { getSideNav } from '../../service/get-side-nav';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import getRelatedContent from '../../api-requests/get-related-content';
import { getPreviewContent } from '../../service/get-preview-content';

let pluralize = require('pluralize');

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    relatedContent: ContentItem[];
}

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    relatedContent,
}) => {
    return (
        <ContentPageTemplate
            crumbs={crumbs}
            topicSlug={topicSlug}
            topicName={topicName}
            contentItem={contentItem}
            tertiaryNavItems={tertiaryNavItems}
            relatedContent={relatedContent}
        />
    );
};

export default ContentPage;

export const getServerSideProps = async (context: any) => {
    const { slug } = context.query;
    const slugString = slug.join('/');
    console.log(slugString);
    const contents: ContentItem[] = await getPreviewContent();
    const contentItem = contents.filter(c => c.slug === slugString)[0];
    const data = {
        crumbs: [],
        contentItem,
        tertiaryNavItems: [],
        topicSlug: '',
        topicName: '',
        relatedContent: [],
    };

    return { props: data };
};

// export const getServer: GetStaticProps = async (context) => {
// const { slug } = context.params as IParams;
// const contents: ContentItem[] = await getAllContentItems();
//
// const contentItem = contents.filter(
//     content => content.slug === slug.join('/')
// )[0];
//
// const vidOrPod = determineVideoOrPodcast(contentItem.collectionType);
// let sideNavFilterSlug = '/' + slug.slice(0, slug.length - 1).join('/');
//
// //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
// if (contentItem.category === 'Code Example') {
//     sideNavFilterSlug =
//         '/languages/' + slug.slice(1, slug.length - 1).join('/');
// }
//
// if (vidOrPod) {
//     if (contentItem.primaryTag?.programmingLanguage) {
//         sideNavFilterSlug =
//             contentItem.primaryTag.programmingLanguage.calculatedSlug;
//     }
//     if (contentItem.primaryTag?.l1Product) {
//         sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
//     }
// }
//
// const slugString = `${sideNavFilterSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.
//
// const crumbs = await getBreadcrumbsFromSlug(slugString);
// const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
// const topicContentTypeCrumb: Crumb = {
//     text: pluralize(contentItem.category),
//     url: `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`,
// };
// crumbs.push(topicContentTypeCrumb);
// let tertiaryNavItems = await getSideNav(sideNavFilterSlug);
// setURLPathForNavItems(tertiaryNavItems);
//
// const metaInfoForTopic = await getMetaInfoForTopic(sideNavFilterSlug);
// tertiaryNavItems = appendDocumentationLinkToSideNav(
//     tertiaryNavItems,
//     metaInfoForTopic
// );
// const topicSlug = sideNavFilterSlug;
// const topicName = metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '';
//
// const relatedContent = getRelatedContent(
//     sideNavFilterSlug,
//     contents,
//     contentItem.slug
// );
//
// const data = {
//     crumbs,
//     contentItem,
//     tertiaryNavItems,
//     topicSlug,
//     topicName,
//     relatedContent,
// };
//
// return {props: data};
//};
