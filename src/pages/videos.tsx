import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';

import ContentTypePage from '../page-templates/content-type';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getContentTypePageData } from '../page-templates/content-type/content-type-data';
import { parsePageNumber } from '../utils/page-type-factory';
import { isValidPage } from '../components/search/utils';

const VideosPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;

    const pageNumber = parsePageNumber(query.page);
    const data = await getContentTypePageData('Video', pageNumber);
    if (
        data?.initialSearchContent &&
        !isValidPage(data?.initialSearchContent.length, pageNumber)
    ) {
        return {
            notFound: true,
        };
    }

    return {
        props: data,
    };
};

export default VideosPage;
