import type { NextPage } from 'next';
import { Crumb } from '../../components/breadcrumbs/types';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { ContentItem } from '../../interfaces/content-item';
import { Tag } from '../../interfaces/tag';
import ContentPageTemplate from '../../page-templates/content-page/content-page-template';
import {
    getPreviewContentForArticles,
    getPreviewContentForEvents,
} from '../../service/get-preview-content';

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
    const topic: Tag = {
        name: '',
        type: 'Technology',
        slug: '',
    };
    let contentItem: ContentItem | null;
    if (slugString.startsWith('events/')) {
        contentItem = await getPreviewContentForEvents('/' + slugString);
    } else {
        contentItem = await getPreviewContentForArticles('/' + slugString);
    }

    // return 404 page when accessing /preview on production app
    // because we do not want to expose /preview to the public
    const inProduction = process.env.APP_ENV === 'production';
    if (!contentItem || inProduction) return { notFound: true };

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
