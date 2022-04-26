import type { NextPage, GetStaticProps } from 'next';
import ContentTypePage from '../page-templates/content-type';
import { PillCategory } from '../types/pill-category';

import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getFilters } from '../page-templates/content-type/utils';

const VideosPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
    const contentType: PillCategory = 'Video';
    const filters = await getFilters(contentType);

    return {
        props: { contentType, ...filters },
    };
};

export default VideosPage;
