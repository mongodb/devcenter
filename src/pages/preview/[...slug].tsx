import type {
    GetServerSidePropsContext,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate from '../../page-templates/content-page/content-page-template';
import { getPreviewContent } from '../../service/get-preview-content';

let pluralize = require('pluralize');

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    relatedContent: ContentItem[];
    tertiaryNavItems: TertiaryNavItem[];
    previewMode?: boolean;
}

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    relatedContent,
    previewMode,
}) => {
    return (
        <ContentPageTemplate
            crumbs={crumbs}
            topicSlug={topicSlug}
            topicName={topicName}
            contentItem={contentItem}
            tertiaryNavItems={tertiaryNavItems}
            relatedContent={relatedContent}
            previewMode={previewMode}
        />
    );
};

export default ContentPage;

export const getServerSideProps = async (context: any) => {
    const { slug } = context.query;
    const slugString = slug.join('/');
    const contents: ContentItem[] = await getPreviewContent('/' + slugString);
    const contentItem = contents.filter(c => c.slug === slugString)[0];
    const result = {
        crumbs: [],
        contentItem,
        tertiaryNavItems: [],
        topicSlug: '',
        topicName: '',
        relatedContent: [],
        previewMode: true,
    };

    return { props: result };
};
