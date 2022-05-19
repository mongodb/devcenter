import type { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import ContentTypePage from '../page-templates/content-type';
import { PillCategory } from '../types/pill-category';

import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getFilters } from '../page-templates/content-type/utils';
import { getAllContentItems } from '../service/get-all-content';

const VideosPage: NextPage<ContentTypePageProps> = props => {
    return (
        <>
            <NextSeo title={'Videos | MongoDB'} />
            <ContentTypePage {...props} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const contentType: PillCategory = 'Video';
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(contentType);

    // TODO: When the featured collection is populated, we will hit that and filter by content type.
    const content = await getAllContentItems();
    const featured = content
        .filter(item => item.category === contentType)
        .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
        .slice(0, 3);

    return {
        props: { contentType, ...filters, featured },
    };
};

export default VideosPage;
