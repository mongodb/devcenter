import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ContentItem } from '../interfaces/content-item';
import { getAllContentItems } from '../service/get-all-content';
import { getDistinctTags } from '../service/get-distinct-tags';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';
import { Crumb } from '../components/breadcrumbs/types';
import ContentPageTemplate from '../page-templates/main-content-page/content-page-template';
import { getContentPageData } from '../page-templates/main-content-page/content-page-data';
import TopicContentTypePageTemplate from '../page-templates/topic-content-type-page/topic-content-type-page-template';
import { getTopicContentTypePageData } from '../page-templates/topic-content-type-page/topic-content-type-page-data';
import TopicPageTemplate from '../page-templates/topic-page/topic-page-template';
import { getTopicPageData } from '../page-templates/topic-page/topic-page-data';
import { getContentForSlug } from '../service/get-content-by-slug';
import staticPathsData from '../service/static-paths.preval';
import { PageType } from '../types/page-type';

interface ContentPageProps {
    pageType: any;
    pageData: any;
}

const DynamicContentPage: NextPage<ContentPageProps> = ({
    pageType,
    pageData,
}) => {
    // TODO: Cleanup, more refactoring, etc
    console.log('pageType', pageType);
    console.log('pageData', pageData);
    if (pageType === PageType.Topic) {
        return <TopicPageTemplate {...pageData} />;
    } else if (pageType === PageType.TopicContentType) {
        return <TopicContentTypePageTemplate {...pageData} />;
    }
    return <ContentPageTemplate {...pageData} />;
};

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any[] = [];

    // const conflictingPaths = ['articles', 'code-examples', 'podcasts', 'quickstarts', 'tutorials', 'videos'];
    const distinctTags = await getDistinctTags();

    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    for (const distinctSlug of distinctSlugs) {
        // For routes with [l1_l2]/[...slug].tsx structure.
        const parsedSlug = distinctSlug.startsWith('/')
            ? distinctSlug.substring(1)
            : distinctSlug;

        console.log('distinctSlug', distinctSlug);
        console.log('parsedSlug', parsedSlug);

        const slug = parsedSlug.split('/');
        paths = paths.concat({
            params: { slug: slug },
        });

        const tertiaryNavItems = await getSideNav(distinctSlug);
        // For routes with [l1_l2]/[topic]/[...slug].tsx structure.
        // Distinct slugs = ["/product/atlas", "product/atlas/search", "language/java"]
        tertiaryNavItems.forEach((item: TertiaryNavItem) => {
            const parsedItemUrl = item.url.startsWith('/')
                ? item.url.substring(1)
                : item.url;
            console.log('parsedItemUrl', parsedItemUrl);
            /*
            eg: tertiary nav item url /product/atlas/article
            /product/atlas/video etc
             */
            const slug = parsedItemUrl.split('/');
            paths = paths.concat({
                params: { slug: slug },
            });
        });
    }

    console.log(paths);

    // All article pages ([...slug.tsx]) are not generated at build time, so they are not included
    // in "paths"
    return { paths: paths, fallback: 'blocking' };
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const { slug } = params as IParams;
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

//     return { props: data, revalidate: 20 };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const { slug } = params as IParams;

//     const slugStr = slug.join('/');
//     console.log('slugStr', slugStr);
//     if(slugStr in staticPathsData){
//         console.log('slugStr is in static paths');
//         const pathData = staticPathsData[slugStr];
//         const { pageType, l1_l2, topic, restOfSlug } = pathData;
//         console.log(pageType, l1_l2, topic, restOfSlug);
//         if(pageType === PageType.Topic && l1_l2){
//             // Static page only -- no revalidate.
//             const data = await getTopicPageData(l1_l2, restOfSlug);
//             return {
//                 props: {
//                     pageData: data,
//                     pageType: pageType,
//                 },
//                 revalidate: 20
//             };
//         } else if(pageType === PageType.TopicContentType && l1_l2 && topic){
//             // Static page only -- no revalidate.
//             const data = await getTopicContentTypePageData(l1_l2, topic, restOfSlug);
//             return {
//                 props: {
//                     pageData: data,
//                     pageType: pageType,
//                 },
//                 revalidate: 20
//             };
//         }
//     }

//     const contentItem: ContentItem | null = await getContentForSlug(slugStr);

//     console.log('contentItem', contentItem);

//     const data = await getContentPageData(slug);
//     console.log(data);
//     if (!data) {
//         return {
//             props: { errorCode: 404 },
//         };
//     }

//     return {
//         props: {
//             pageData: data,
//             pageType: PageType.Content,
//         },
//         revalidate: 20
//     };
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const slugStr = slug.join('/');

    // TODO: Avoid pulling all content for each call to getServerSideProps
    const contents: ContentItem[] = await getAllContentItems();

    const contentPaths = contents.map((content: ContentItem) => content.slug);

    let data: any | null = {};
    let pageType = null;

    // TODO: Avoid pulling all paths and tags for each call to getServerSideProps
    if (contentPaths.includes(slugStr)) {
        pageType = PageType.Content;
        data = await getContentPageData(slug);
    } else {
        const distinctTags = await getDistinctTags();

        const distinctSlugs = distinctTags
            .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
            .map(tag => tag.slug);

        let topicContentTypePaths: any = {};
        let topicPaths: any = {};

        for (const distinctSlug of distinctSlugs) {
            const parsedSlug = distinctSlug.startsWith('/')
                ? distinctSlug.substring(1)
                : distinctSlug;
            const category = parsedSlug.split('/')[0];
            const slug = parsedSlug.split('/').slice(1);
            topicPaths[parsedSlug] = { l1_l2: category, slug: slug };

            const tertiaryNavItems = await getSideNav(distinctSlug);

            tertiaryNavItems.forEach((item: TertiaryNavItem) => {
                const parsedItemUrl = item.url.startsWith('/')
                    ? item.url.substring(1)
                    : item.url;

                /*
                eg: tertiary nav item url /product/atlas/article
                /product/atlas/video etc
                 */
                const category = parsedItemUrl.split('/')[0];
                const topic = parsedItemUrl.split('/')[1];
                const restOfSlug = parsedItemUrl.split('/').slice(2);

                topicContentTypePaths[parsedItemUrl] = {
                    l1_l2: category,
                    topic: topic,
                    slug: restOfSlug,
                };
            });
        }

        if (slugStr in topicPaths) {
            pageType = PageType.Topic;
            const { l1_l2, slug } = topicPaths[slugStr];
            data = await getTopicPageData(l1_l2, slug);
        } else if (slugStr in topicContentTypePaths) {
            pageType = PageType.TopicContentType;
            const { l1_l2, topic, slug } = topicContentTypePaths[slugStr];
            data = await getTopicContentTypePageData(l1_l2, topic, slug);
        }
    }

    return {
        props: {
            pageData: data,
            pageType: pageType,
        },
        revalidate: 20,
    };
};

export default DynamicContentPage;
