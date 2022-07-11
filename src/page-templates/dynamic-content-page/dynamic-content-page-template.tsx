import type { NextPage } from 'next';
import ContentPageTemplate from '../../page-templates/main-content-page/content-page-template';
import TopicContentTypePageTemplate from '../../page-templates/topic-content-type-page/topic-content-type-page-template';
import TopicPageTemplate from '../../page-templates/topic-page/topic-page-template';
import { getTopicPagePathMappings } from '../../service/get-topic-paths';
import { PageType } from '../../types/page-type';
import allContent from '../../service/get-all-content.preval';

interface ContentPageProps {
    pageType: any;
    pageData: any;
}

const DynamicContentTemplate: NextPage<ContentPageProps> = ({
    pageType,
    pageData,
}) => {
    switch (pageType) {
        case PageType.Content:
            return <ContentPageTemplate {...pageData} />;
        case PageType.Topic:
            return <TopicPageTemplate {...pageData} />;
        case PageType.TopicContentType:
            return <TopicContentTypePageTemplate {...pageData} />;
        default:
            return null;
    }
};

export const getDynamicPaths = async () => {
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

    for (const content of allContent) {
        paths = paths.concat({
            params: { slug: content.slug.split('/') },
        });
    }

    return paths;
};

export default DynamicContentTemplate;
