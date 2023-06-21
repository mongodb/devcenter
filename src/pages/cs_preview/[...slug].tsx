import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate from '../../page-templates/content-page/content-page-template';
import { Tag } from '../../interfaces/tag';
import {
    getPreviewContentForArticles,
    getPreviewContentForEvents,
} from '../../service/get-preview-content';
import { onEntryChange } from '../../utils/content-stack-init';

interface PreviewContentPageProps {
    crumbs: Crumb[];
    topic: Tag;
    contentItem: ContentItem;
    relatedContent: ContentItem[];
    tertiaryNavItems: TertiaryNavItem[];
    previewMode?: boolean;
    slugString: string;
}

const ContentPage: NextPage<PreviewContentPageProps> = ({
    crumbs,
    topic,
    contentItem,
    tertiaryNavItems,
    relatedContent,
    previewMode,
    slugString,
}) => {
    const [data, setData] = useState({
        crumbs,
        topic,
        contentItem,
        tertiaryNavItems,
        relatedContent,
        previewMode,
        slugString,
    });
    async function fetchData() {
        try {
            const updatedContentItem = await getPreviewData(slugString);
            if (!updatedContentItem) throw new Error('Status: ' + 404);
            setData({
                crumbs: crumbs,
                topic: topic,
                contentItem: updatedContentItem,
                tertiaryNavItems: tertiaryNavItems,
                relatedContent: relatedContent,
                previewMode: previewMode,
                slugString: slugString,
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, [contentItem.content]);

    return (
        <ContentPageTemplate
            crumbs={data.crumbs}
            topic={data.topic}
            contentItem={data.contentItem}
            tertiaryNavItems={data.tertiaryNavItems}
            relatedContent={data.relatedContent}
            previewMode={data.previewMode}
        />
    );
};

export default ContentPage;

const getPreviewData = async (slugString: string) => {
    let contentItem;
    if (slugString.startsWith('events/')) {
        contentItem = await getPreviewContentForEvents('/' + slugString);
    } else {
        contentItem = await getPreviewContentForArticles('/' + slugString);
    }
    return contentItem;
};

export const getServerSideProps = async (context: any) => {
    const { slug } = context.query;
    const slugString = slug.join('/');
    const topic: Tag = {
        name: '',
        type: 'Technology',
        slug: '',
    };
    const contentItem = await getPreviewData(slugString);

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
