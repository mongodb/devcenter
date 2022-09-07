import type { NextPage } from 'next';
import ContentPageTemplate from '../../page-templates/main-content-page/content-page-template';
import TopicContentTypePageTemplate from '../../page-templates/topic-content-type-page/topic-content-type-page-template';
import TopicPageTemplate from '../../page-templates/topic-page/topic-page-template';
import { PageType } from '../../types/page-type';

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

export default DynamicContentTemplate;
