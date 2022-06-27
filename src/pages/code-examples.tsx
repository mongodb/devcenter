import type { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import ContentTypePage from '../page-templates/content-type';
import { PillCategory } from '../types/pill-category';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import { getFilters } from '../hooks/search/utils';
import { getAllContentItems } from '../service/get-all-content';

const CodeExamplesPage: NextPage<ContentTypePageProps> = props => {
    return (
        <>
            <NextSeo
                title={'Code Examples | MongoDB'}
                {...(props.description && {
                    description: props.description,
                })}
            />
            <ContentTypePage {...props} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const contentType: PillCategory = 'Code Example';
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const { contentTypeItems, ...filters } = await getFilters(contentType);

    // TODO: When the featured collection is populated, we will hit that and filter by content type.
    const content = await getAllContentItems();
    const codeExamples = content.filter(item => item.category === contentType);
    const featured = codeExamples
        .sort((a, b) => b.contentDate.localeCompare(a.contentDate))
        .slice(0, 3);

    return {
        props: {
            contentType,
            ...filters,
            featured,
        },
        revalidate: 300,
    };
};

export default CodeExamplesPage;
