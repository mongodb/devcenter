import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getDistinctTags } from '../service/get-distinct-tags';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';
import ContentPageTemplate from '../page-templates/main-content-page/content-page-template';
import { getContentPageData } from '../page-templates/main-content-page/content-page-data';
import TopicContentTypePageTemplate from '../page-templates/topic-content-type-page/topic-content-type-page-template';
import { getTopicContentTypePageData } from '../page-templates/topic-content-type-page/topic-content-type-page-data';
import TopicPageTemplate from '../page-templates/topic-page/topic-page-template';
import { getTopicPageData } from '../page-templates/topic-page/topic-page-data';
import allContent from '../service/get-all-content.preval';
import { PageType } from '../types/page-type';
import { ContentItem } from '../interfaces/content-item';

interface ContentPageProps {
    pageType: any;
    pageData: any;
}

const DynamicContentPage: NextPage<ContentPageProps> = ({
    pageType,
    pageData,
}) => {
    if (pageType === PageType.Topic) {
        return <TopicPageTemplate {...pageData} />;
    } else if (pageType === PageType.TopicContentType) {
        return <TopicContentTypePageTemplate {...pageData} />;
    }
    return <ContentPageTemplate {...pageData} />;
};

export default DynamicContentPage;

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

// export const getStaticPaths: GetStaticPaths = async () => {
//     let paths: any[] = [];

//     const distinctTags = await getDistinctTags();

//     const distinctSlugs = distinctTags
//         .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
//         .map(tag => tag.slug);

//     for (const distinctSlug of distinctSlugs) {
//         // For routes with [l1_l2]/[...slug].tsx structure.
//         const parsedSlug = distinctSlug.startsWith('/')
//             ? distinctSlug.substring(1)
//             : distinctSlug;

//         const slug = parsedSlug.split('/');
//         paths = paths.concat({
//             params: { slug: slug },
//         });

//         const tertiaryNavItems = await getSideNav(distinctSlug);
//         // For routes with [l1_l2]/[topic]/[...slug].tsx structure.
//         // Distinct slugs = ["/product/atlas", "product/atlas/search", "language/java"]
//         tertiaryNavItems.forEach((item: TertiaryNavItem) => {
//             const parsedItemUrl = item.url.startsWith('/')
//                 ? item.url.substring(1)
//                 : item.url;
//             /*
//             eg: tertiary nav item url /product/atlas/article
//             /product/atlas/video etc
//              */
//             const slug = parsedItemUrl.split('/');
//             paths = paths.concat({
//                 params: { slug: slug },
//             });
//         });
//     }

//     // All article pages ([...slug.tsx]) are not generated at build time, so they are not included
//     // in "paths"
//     return { paths: paths, fallback: 'blocking' };
// };

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { slug } = context.params as IParams;
    const slugStr = slug.join('/');

    // TODO: Avoid pulling all content for each call to getServerSideProps
    // const contents: ContentItem[] = await getAllContentItems();
    const contents: ContentItem[] = allContent;

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

    if (!pageType || Object.keys(data).length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            pageData: data,
            pageType: pageType,
        },
    };
};

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//     console.log('getServerSideProps', context);
//     const { slug } = context.params as IParams;
//     const slugStr = slug.join('/');

//     let data : any = {};
//     let pageType;
//     console.log('slugStr', slugStr);
//     // console.log(staticPathsData);
//     // if(slugStr in staticPathsData){
//     //     const pathData = staticPathsData[slugStr];
//     //     const { l1_l2, topic, slug, fullSlug } = pathData;

//     //     console.log('$PATH DATA', l1_l2, topic, slug, fullSlug);

//     //     if(pathData.pageType === PageType.Topic && l1_l2){
//     //         // Static page only -- no revalidate.
//     //         console.log(l1_l2, slug);
//     //         data = await getTopicPageData(l1_l2, slug);
//     //         pageType = PageType.Topic;
//     //     } else if(pageType === PageType.TopicContentType && l1_l2 && topic){
//     //         // Static page only -- no revalidate.
//     //         data = await getTopicContentTypePageData(l1_l2, topic, slug);
//     //         pageType = PageType.TopicContentType;
//     //     }
//     // } else {
//     console.log('$SLUG', slug);
//     data = await getContentPageData(slug);
//     pageType = PageType.Content;
//     // }

//     console.log(pageType);
//     console.log(data);
//     if (!data) {
//         return {
//             props: { errorCode: 404 },
//         };
//     }

//     return {
//         props: {
//             pageData: data,
//             pageType: pageType,
//         }
//     };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const { slug } = params as IParams;
//     const slugStr = slug.join('/');

//     let data : any = {};
//     let pageType;
//     console.log('slugStr', slugStr);
//     if(slugStr in staticPathsData){
//         const pathData = staticPathsData[slugStr];
//         const { l1_l2, topic, restOfSlug } = pathData;

//         if(pathData.pageType === PageType.Topic && l1_l2){
//             // Static page only -- no revalidate.
//             data = await getTopicPageData(l1_l2, restOfSlug);
//             pageType = PageType.Topic;
//         } else if(pageType === PageType.TopicContentType && l1_l2 && topic){
//             // Static page only -- no revalidate.
//             data = await getTopicContentTypePageData(l1_l2, topic, restOfSlug);
//             pageType = PageType.TopicContentType;
//         }
//     } else {
//         console.log('$SLUG', slug);
//         data = await getContentPageData(slug);
//         pageType = PageType.Content;
//     }

//     console.log(pageType);
//     console.log(data);
//     if (!data) {
//         return {
//             props: { errorCode: 404 },
//         };
//     }

//     return {
//         props: {
//             pageData: data,
//             pageType: pageType,
//         },
//         revalidate: 60
//     };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const { slug } = params as IParams;
//     const slugStr = slug.join('/');

//     // TODO: Avoid pulling all content for each call to getServerSideProps
//     const contents: ContentItem[] = await getAllContentItems();

//     const contentPaths = contents.map((content: ContentItem) => content.slug);

//     let data: any | null = {};
//     let pageType = null;

//     // TODO: Avoid pulling all paths and tags for each call to getServerSideProps
//     if (contentPaths.includes(slugStr)) {
//         pageType = PageType.Content;
//         data = await getContentPageData(slug);
//     } else {
//         const distinctTags = await getDistinctTags();

//         const distinctSlugs = distinctTags
//             .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
//             .map(tag => tag.slug);

//         let topicContentTypePaths: any = {};
//         let topicPaths: any = {};

//         for (const distinctSlug of distinctSlugs) {
//             const parsedSlug = distinctSlug.startsWith('/')
//                 ? distinctSlug.substring(1)
//                 : distinctSlug;
//             const category = parsedSlug.split('/')[0];
//             const slug = parsedSlug.split('/').slice(1);
//             topicPaths[parsedSlug] = { l1_l2: category, slug: slug };

//             const tertiaryNavItems = await getSideNav(distinctSlug);

//             tertiaryNavItems.forEach((item: TertiaryNavItem) => {
//                 const parsedItemUrl = item.url.startsWith('/')
//                     ? item.url.substring(1)
//                     : item.url;

//                 /*
//                 eg: tertiary nav item url /product/atlas/article
//                 /product/atlas/video etc
//                  */
//                 const category = parsedItemUrl.split('/')[0];
//                 const topic = parsedItemUrl.split('/')[1];
//                 const restOfSlug = parsedItemUrl.split('/').slice(2);

//                 topicContentTypePaths[parsedItemUrl] = {
//                     l1_l2: category,
//                     topic: topic,
//                     slug: restOfSlug,
//                 };
//             });
//         }

//         if (slugStr in topicPaths) {
//             pageType = PageType.Topic;
//             const { l1_l2, slug } = topicPaths[slugStr];
//             data = await getTopicPageData(l1_l2, slug);
//         } else if (slugStr in topicContentTypePaths) {
//             pageType = PageType.TopicContentType;
//             const { l1_l2, topic, slug } = topicContentTypePaths[slugStr];
//             data = await getTopicContentTypePageData(l1_l2, topic, slug);
//         }
//     }

//     return {
//         props: {
//             pageData: data,
//             pageType: pageType,
//         },
//         revalidate: 20,
//     };
// };
