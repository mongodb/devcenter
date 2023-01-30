import type { NextPage } from 'next';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate from '../../page-templates/content-page/content-page-template';
import {
    getPreviewContentForArticles,
    getPreviewContentForEvents,
} from '../../service/get-preview-content';

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
    let contentItem;
    if (slugString.startsWith('events/')) {
        contentItem = await getPreviewContentForEvents('/' + slugString);
    } else {
        const contents: ContentItem[] = await getPreviewContentForArticles(
            '/' + slugString
        );
        contentItem = contents.find(c => c.slug === slugString);
    }

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
