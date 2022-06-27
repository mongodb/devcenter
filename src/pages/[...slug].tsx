import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import ContentPageTemplate from '../page-templates/main-content-page/content-page-template';
import { getContentPageData } from '../page-templates/main-content-page/content-page-data';
import TopicContentTypePageTemplate from '../page-templates/topic-content-type-page/topic-content-type-page-template';
import { getTopicContentTypePageData } from '../page-templates/topic-content-type-page/topic-content-type-page-data';
import TopicPageTemplate from '../page-templates/topic-page/topic-page-template';
import { getTopicPageData } from '../page-templates/topic-page/topic-page-data';
import { getTopicPagePathMappings } from '../service/get-topic-paths';
import { PageType } from '../types/page-type';

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

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any[] = [];
    const { topicPaths, topicContentTypePaths } =
        await getTopicPagePathMappings();

    // Topic pages (e.g. /products/mongodb, /languages/python) are pre-built.
    for (const k of Object.keys(topicPaths)) {
        paths = paths.concat({
            params: { slug: topicPaths[k].fullSlug },
        });
    }
    // Topic content pages (e.g. /products/mongodb/quickstarts, /languages/python/code-examples) are pre-built.
    for (const k of Object.keys(topicContentTypePaths)) {
        paths = paths.concat({
            params: { slug: topicContentTypePaths[k].fullSlug },
        });
    }

    // All article pages ([...slug.tsx]) are not generated at build time, so they are not included
    // in "paths"
    return { paths: paths, fallback: 'blocking' };
};

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const slugStr = slug.join('/');

    let data: any | null = {};
    let pageType = null;

    const { topicPaths, topicContentTypePaths } =
        await getTopicPagePathMappings();

    if (slugStr in topicPaths) {
        pageType = PageType.Topic;
        const { l1_l2, slug } = topicPaths[slugStr];
        // Data is static, pre-evaluated at build time.
        data = await getTopicPageData(l1_l2, slug);
    } else if (slugStr in topicContentTypePaths) {
        pageType = PageType.TopicContentType;
        const { l1_l2, topic, slug } = topicContentTypePaths[slugStr];
        // Data is static, pre-evaluated at build time.
        data = await getTopicContentTypePageData(l1_l2, topic, slug);
    } else {
        data = await getContentPageData(slug);
        pageType = PageType.Content;
    }

    if (!pageType || !data || Object.keys(data).length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            pageData: data,
            pageType: pageType,
        },
        revalidate: 60,
    };
};
