import type { NextPage, GetStaticProps } from 'next';

import ContentTypePage from '../page-templates/content-type';
import { PillCategory } from '../types/pill-category';
import { ContentTypePageProps } from '../page-templates/content-type/types';
import {
    getFeaturedLangProdTech,
    getFilters,
} from '../page-templates/content-type/utils';
import { getAllContentItems } from '../service/get-all-content';

const CodeExamplesPage: NextPage<ContentTypePageProps> = props => {
    return <ContentTypePage {...props} />;
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
    const { featuredLanguages, featuredTechnologies, featuredProducts } =
        getFeaturedLangProdTech(contentType, codeExamples);
    return {
        props: {
            contentType,
            ...filters,
            featured,
            featuredLanguages,
            featuredTechnologies,
            featuredProducts,
        },
    };
};

export default CodeExamplesPage;
