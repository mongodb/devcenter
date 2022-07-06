import type { NextPage, GetStaticProps } from 'next';

import ContentTypePage from '../page-templates/content-type';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getContentTypePageData } from '../page-templates/content-type/content-type-data';

const ArticlesPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
    const data = await getContentTypePageData('Article');
    return {
        props: data,
    };
};

export default ArticlesPage;
