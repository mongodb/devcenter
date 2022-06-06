import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import ContentPageTemplate, {
    determineVideoOrPodcast,
} from '../../components/main-content-page/content-page-template';
import { getAllContentItems } from '../../service/get-all-content';
import { getBreadcrumbsFromSlug } from '../../components/breadcrumbs/utils';
import { pillCategoryToSlug } from '../../types/pill-category';
import { getSideNav } from '../../service/get-side-nav';
import { setURLPathForNavItems } from '../../utils/format-url-path';
import { getMetaInfoForTopic } from '../../service/get-meta-info-for-topic';
import { appendDocumentationLinkToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import getRelatedContent from '../../api-requests/get-related-content';
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
    const { slug } = context.query;
    const slugString = slug.join('/');
    const contents: ContentItem[] = await getPreviewContent();
    const contentItem = contents.filter(c => c.slug === slugString)[0];
    const data = {
        crumbs: [],
        contentItem,
        tertiaryNavItems: [],
        topicSlug: '',
        topicName: '',
        relatedContent: [],
    };

    return { props: data };
};
