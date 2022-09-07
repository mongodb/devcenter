import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';

import ContentTypePage from '../page-templates/content-type';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getContentTypePageData } from '../page-templates/content-type/content-type-data';
import { parsePageNumber } from '../utils/page-type-factory';

const ArticlesPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;

    const pageNumber = parsePageNumber(query.page);
    const data = await getContentTypePageData('Article', pageNumber);
    return {
        props: data,
    };
};

export default ArticlesPage;
