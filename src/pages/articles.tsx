import type { NextPage } from 'next';
import ContentTypePage from '../page-templates/content-type';

const ArticlesPage: NextPage = () => {
    return <ContentTypePage contentType="Article" />;
};

export default ArticlesPage;
