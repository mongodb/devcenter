import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPaths,
    GetStaticProps,
    NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ContentItem } from '../interfaces/content-item';
import { getContentForSlug } from '../service/get-content-by-slug';
import { pillCategoryToSlug } from '../types/pill-category';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { setURLPathForNavItems } from '../utils/format-url-path';
import { getMetaInfoForTopic } from '../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../components/breadcrumbs/utils';
import { Crumb } from '../components/breadcrumbs/types';
import { appendDocumentationLinkToSideNav } from '../utils/add-documentation-link-to-side-nav';
import ContentPageTemplate, {
    determineVideoOrPodcast,
} from '../page-templates/main-content-page/content-page-template';
import { getRelatedContent } from '../utils/get-related-content';
import allContentData from '../service/related-content.preval';

let pluralize = require('pluralize');

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    contentItemSlug: string;
    sideNavFilterSlug: string;
}

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    contentItemSlug,
    sideNavFilterSlug,
}) => {
    const relatedContent = getRelatedContent(
        sideNavFilterSlug,
        allContentData,
        contentItemSlug
    );

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

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths = async () => {
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const slugStr = slug.join('/');

    const contentItem: ContentItem | null = await getContentForSlug(slugStr);
    if (!contentItem) {
        return {
            props: { errorCode: 404 },
        };
    }

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

    const data = {
        crumbs,
        contentItem,
        tertiaryNavItems,
        topicSlug,
        topicName,
        sideNavFilterSlug,
        contentItemSlug: contentItem.slug,
    };

    return { props: data, revalidate: 10 };
};

// export const getServerSideProps: GetServerSideProps = async (
//     context: GetServerSidePropsContext
// ) => {
//     const { slug } = context.params as IParams;
//     const slugStr = slug.join('/');

//     const contentItem: ContentItem | null = await getContentForSlug(slugStr);
//     if (!contentItem) {
//         return {
//             props: { errorCode: 404 },
//         };
//     }

//     const vidOrPod = determineVideoOrPodcast(contentItem.collectionType);
//     let sideNavFilterSlug = '/' + slug.slice(0, slug.length - 1).join('/');

//     //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
//     if (contentItem.category === 'Code Example') {
//         sideNavFilterSlug =
//             '/languages/' + slug.slice(1, slug.length - 1).join('/');
//     }

//     if (vidOrPod) {
//         if (contentItem.primaryTag?.programmingLanguage) {
//             sideNavFilterSlug =
//                 contentItem.primaryTag.programmingLanguage.calculatedSlug;
//         }
//         if (contentItem.primaryTag?.l1Product) {
//             sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
//         }
//     }

//     const slugString = `${sideNavFilterSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.

//     const crumbs = await getBreadcrumbsFromSlug(slugString);
//     const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
//     const topicContentTypeCrumb: Crumb = {
//         text: pluralize(contentItem.category),
//         url: `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`,
//     };
//     crumbs.push(topicContentTypeCrumb);
//     let tertiaryNavItems = await getSideNav(sideNavFilterSlug);
//     setURLPathForNavItems(tertiaryNavItems);

//     const metaInfoForTopic = await getMetaInfoForTopic(sideNavFilterSlug);
//     tertiaryNavItems = appendDocumentationLinkToSideNav(
//         tertiaryNavItems,
//         metaInfoForTopic
//     );
//     const topicSlug = sideNavFilterSlug;
//     const topicName = metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '';

//     const data = {
//         crumbs,
//         contentItem,
//         tertiaryNavItems,
//         topicSlug,
//         topicName,
//         sideNavFilterSlug,
//         contentItemSlug: contentItem.slug,
//     };

//     return { props: data };
// };
