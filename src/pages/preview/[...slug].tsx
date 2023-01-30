import type { NextPage } from 'next';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate from '../../page-templates/content-page/content-page-template';
import { getPreviewContent } from '../../service/get-preview-content';
import { Tag } from '../../interfaces/tag';

interface ContentPageProps {
    crumbs: Crumb[];
    topic: Tag;
    contentItem: ContentItem;
    relatedContent: ContentItem[];
    tertiaryNavItems: TertiaryNavItem[];
    previewMode?: boolean;
}

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topic,
    contentItem,
    tertiaryNavItems,
    relatedContent,
    previewMode,
}) => {
    return (
        <ContentPageTemplate
            crumbs={crumbs}
            topic={topic}
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
    const topic: Tag = {
        name: '',
        type: 'Technology',
        slug: '',
    };
    const result = {
        crumbs: [],
        contentItem,
        tertiaryNavItems: [],
        topic,
        relatedContent: [],
        previewMode: true,
    };

    return { props: result };
};
