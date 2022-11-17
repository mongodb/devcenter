import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';
import { getContentPageData } from '../page-templates/content-page/content-page-data';
import { getTopicContentTypePageData } from '../page-templates/topic-content-type-page/topic-content-type-page-data';
import { getTopicPageData } from '../page-templates/topic-page/topic-page-data';
import { PageParams } from '../interfaces/page-params';
import { PageType } from '../types/page-type';
import { DynamicPageType } from '../types/page-type-factory';
import { pageTypeFactory, parsePageNumber } from '../utils/page-type-factory';
import { isValidPage } from '../components/search/utils';
import ContentPageTemplate from '../page-templates/content-page/content-page-template';
import TopicContentTypePageTemplate from '../page-templates/topic-content-type-page/topic-content-type-page-template';
import TopicPageTemplate from '../page-templates/topic-page/topic-page-template';

interface ContentPageProps {
    pageType: PageType;
    pageData: any;
}

const DynamicContentPage: NextPage<ContentPageProps> = ({
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

export default DynamicContentPage;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;
    const { slug } = query as PageParams;

    const dynamicPageType: DynamicPageType = await pageTypeFactory(slug);
    const {
        pageType,
        pageParams,
    }: { pageType: PageType; pageParams: PageParams } = dynamicPageType;
    let data: any | null = {};

    let pageNumber: number;
    switch (pageType) {
        case PageType.Content:
            // cache content only for 5 minutes
            context.res.setHeader(
                'Cache-Control',
                'public, must-revalidate, proxy-revalidate, max-age=300'
            );

            data = await getContentPageData(slug);
            break;
        case PageType.Topic:
            pageNumber = parsePageNumber(query.page);
            data = await getTopicPageData(
                pageParams.l1_l2 as string,
                pageParams.slug,
                pageNumber
            );
            if (
                data?.initialSearchContent &&
                !isValidPage(data?.initialSearchContent.length, pageNumber)
            ) {
                return {
                    notFound: true,
                };
            }
            break;
        case PageType.TopicContentType:
            pageNumber = parsePageNumber(query.page);
            data = await getTopicContentTypePageData(
                pageParams.l1_l2 as string,
                pageParams.topic as string,
                pageParams.slug,
                pageNumber
            );
            if (
                data?.initialSearchContent &&
                !isValidPage(data?.initialSearchContent.length, pageNumber)
            ) {
                return {
                    notFound: true,
                };
            }
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
    };
};
