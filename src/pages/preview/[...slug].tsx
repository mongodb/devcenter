import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate, {
    determineVideoOrPodcast,
} from '../../components/main-content-page/content-page-template';
import { getPreviewContent } from '../../service/get-preview-content';

let pluralize = require('pluralize');

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    relatedContent: ContentItem[];
}

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    relatedContent,
}) => {
    return (
        <ContentPageTemplate
            crumbs={crumbs}
            topicSlug={topicSlug}
            topicName={topicName}
            contentItem={contentItem}
            tertiaryNavItems={tertiaryNavItems}
            relatedContent={relatedContent}
        />
    );
};

export default ContentPage;

export const getServerSideProps = async (context: any) => {
    context.res.setHeader(
        'Cache-Control',
        'no-cache',
        'no-store',
        'max-age=0',
        'must-revalidate'
    );
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
    };

    return { props: result };
};
