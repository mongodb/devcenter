import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getContentPageData } from '../page-templates/main-content-page/content-page-data';
import { getTopicContentTypePageData } from '../page-templates/topic-content-type-page/topic-content-type-page-data';
import DynamicContentTemplate from '../page-templates/dynamic-content-page/dynamic-content-page-template';
import { getTopicPageData } from '../page-templates/topic-page/topic-page-data';
import { PageParams } from '../interfaces/page-params';
import { PageType } from '../types/page-type';
import { DynamicPageType } from '../types/page-type-factory';
import { pageTypeFactory } from '../utils/page-type-factory';

interface ContentPageProps {
    pageType: PageType;
    pageData: any;
}

const DynamicContentPage: NextPage<ContentPageProps> = ({
    pageType,
    pageData,
}) => {
    return <DynamicContentTemplate pageType={pageType} pageData={pageData} />;
};

export default DynamicContentPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as PageParams;

    const dynamicPageType: DynamicPageType = await pageTypeFactory(slug);
    const {
        pageType,
        pageParams,
    }: { pageType: PageType; pageParams: PageParams } = dynamicPageType;
    let data: any | null = {};

    switch (pageType) {
        case PageType.Content:
            data = await getContentPageData(slug);
            break;
        case PageType.Topic:
            data = await getTopicPageData(
                pageParams.l1_l2 as string,
                pageParams.slug
            );
            break;
        case PageType.TopicContentType:
            data = await getTopicContentTypePageData(
                pageParams.l1_l2 as string,
                pageParams.topic as string,
                pageParams.slug
            );
            break;
        default:
            data = null;
            break;
    }

    if (!pageType || !data || Object.keys(data).length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            pageData: data,
            pageType: pageType,
        },
        revalidate: 300,
    };
};
