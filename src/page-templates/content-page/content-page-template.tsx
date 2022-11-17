// libraries
import axios from 'axios';
import Image from 'next/image';
import { NextPage } from 'next';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import getConfig from 'next/config';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { Grid, ThemeUICSSObject } from 'theme-ui';
import {
    Button,
    ESystemIconNames,
    GridLayout,
    HorizontalRule,
    Link,
    SideNav,
    TypographyScale,
} from '@mdb/flora';
// components
import FeedbackModal, {
    feedbackModalStages,
} from '../../components/feedback-modal';
import Card from '../../components/card';
import SeriesCard from '../../components/series-card';
import TagSection from '../../components/tag-section';
import Breadcrumbs from '../../components/breadcrumbs';
import AuthorLockup from '../../components/author-lockup';
import { getCardProps } from '../../components/card/utils';
import ContentRating from '../../components/content-rating';
import SocialButtons from '../../components/social-buttons';
import SecondaryTag from '../../components/card/secondary-tag';
import RequestContentModal from '../../components/request-content-modal';
import PodcastPlayer from '../../components/podcast-player/podcast-player';
import { DocumentBody } from '../../components/article-body/document-body';
import { TableOfContents } from '../../components/article-body/table-of-contents';
import { VideoEmbed } from '../../components/article-body/body-components/video-embed';
// context
import { useRequestContentModal } from '../../contexts/request-content-modal';
// types
import { CodeLevel } from '../../types/tag-type';
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { IRating } from '../../components/feedback-modal/types';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
// utils
import { normalizeCategory } from './util';
import { getCanonicalUrl } from '../../utils/seo';
import { getURLPath } from '../../utils/format-url-path';
import { constructDateDisplay } from '../../utils/format-date';
import { getPlaceHolderImage } from '../../utils/get-place-holder-thumbnail';
import { parseMarkdownToAST } from '../../utils/markdown-parser/parse-markdown-to-ast';
import { getTableOfContents } from '../../utils/markdown-parser/get-table-of-contents';
import { parseAuthorsToAuthorLockup } from '../../utils/parse-authors-to-author-lockup';
import {
    getRequestBtnText,
    addExternalIconToSideNav,
} from '../../utils/page-template-helpers';
// styles
import styles from './styles';
import {
    sideNavStyles,
    sideNavTitleStyles,
} from '../../components/tertiary-nav/styles';

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    relatedContent: ContentItem[];
    previewMode?: boolean;
}

const parseUndefinedValue = (description: string | undefined): string =>
    description ?? '';

const ContentPageTemplate: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    tertiaryNavItems,
    relatedContent,
    previewMode,
    contentItem: {
        collectionType,
        authors,
        category,
        contentDate,
        updateDate,
        description,
        content,
        image,
        slug,
        tags,
        title,
        podcastFileUrl,
        videoId,
        series,
        githubUrl,
        liveSiteUrl,
        codeType,
        seo,
        relevantLinks,
    },
}) => {
    const router = useRouter();
    const { asPath } = router;
    const { publicRuntimeConfig } = getConfig();
    const { setModalStage } = useRequestContentModal();

    const [ratingStars, setRatingStars] = useState(0);
    const [feedbackId, setFeedbackId] = useState<string>('');
    const [feedbackModalStage, setFeedbackModalStage] =
        useState<feedbackModalStages>('closed');

    const requestButtonText = getRequestBtnText(category);

    const isVideoOrPodcastContent =
        collectionType === 'Video' || collectionType === 'Podcast';

    const displayDate = constructDateDisplay(
        isVideoOrPodcastContent,
        contentDate,
        updateDate
    );

    const hasRequestContentFlow =
        !previewMode && category !== 'News & Announcements';

    tertiaryNavItems = addExternalIconToSideNav(
        tertiaryNavItems,
        'documentation'
    );

    const displayTitle = (
        <TypographyScale
            customElement="h1"
            variant="heading2"
            sx={{ marginBottom: ['inc20', null, null, 'inc30'] }}
        >
            {title}
        </TypographyScale>
    );

    const displaySocialButtons = !previewMode ? (
        <SocialButtons
            description={parseUndefinedValue(description)}
            heading={title}
            authors={authors}
            tags={tags}
            sx={{
                gridArea: 'social',
                justifySelf: ['start', null, 'end'],
            }}
        />
    ) : null;

    const onRate = (stars: number) => {
        const body: IRating = {
            slug,
            stars,
            title,
        };
        axios
            .post(getURLPath('/api/createFeedback') as string, body)
            .then(({ data }) => {
                setFeedbackId(data._id);
            });
        setRatingStars(stars); // This should update both rating sections but it doesn't.
        setFeedbackModalStage(stars === 3 ? 'text' : 'checkbox');
    };

    const ratingSection = (
        <div
            sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
            }}
        >
            <span>Rate this {normalizeCategory(category)}</span>
            <ContentRating stars={ratingStars} onRate={onRate} />
        </div>
    );

    const renderExternalExamples = (st: ThemeUICSSObject = {}) => (
        <div
            sx={{
                ...styles.externalExamples,
                ...st,
            }}
        >
            {githubUrl && (
                <Button
                    hasIcon
                    href={githubUrl}
                    target="_blank"
                    variant="secondary"
                    iconName={ESystemIconNames.EXTERNAL}
                    sx={{ width: 'auto' }}
                >
                    View Code
                </Button>
            )}
            {liveSiteUrl && (
                <Link
                    linkIcon="arrow"
                    href={liveSiteUrl}
                    sx={{ marginTop: ['inc30', 0] }}
                >
                    Try it
                </Link>
            )}
        </div>
    );

    const contentFooter = (
        <div sx={styles.footer}>
            <div>
                <HorizontalRule />
                {!previewMode && (
                    <div sx={styles.footerActions}>
                        <SocialButtons
                            description={parseUndefinedValue(description)}
                            heading={title}
                            authors={authors}
                            tags={tags}
                        />
                        {ratingSection}
                    </div>
                )}
            </div>
            {series && <SeriesCard series={series} currentTitle={title} />}
            <div>
                <TypographyScale
                    variant="heading5"
                    sx={{ marginBottom: 'inc30' }}
                >
                    Related
                </TypographyScale>
                <Grid gap={['inc30', null, 'inc40']} columns={[1, null, 2]}>
                    {relatedContent.map(piece => (
                        <Card
                            sx={{ height: '100%' }}
                            key={piece.slug}
                            {...getCardProps(piece, 'related')}
                        />
                    ))}
                </Grid>
            </div>
            {hasRequestContentFlow && (
                <Button
                    variant="secondary"
                    sx={styles.requestBtn}
                    onClick={() => setModalStage('text')}
                >
                    {requestButtonText}
                </Button>
            )}
        </div>
    );

    function VideoOrPodcastContent() {
        return (
            <>
                <div sx={styles.section}>
                    {displayTitle}
                    <div sx={styles.vidOrPodHeaderGrid}>
                        <TypographyScale
                            variant="body3"
                            color="secondary"
                            customStyles={{
                                display: 'block',
                                marginBottom: 0,
                                gridArea: 'authordate',
                            }}
                        >
                            {displayDate}
                        </TypographyScale>
                        {tags && (
                            <TagSection tags={tags} sx={{ gridArea: 'tags' }} />
                        )}
                        {displaySocialButtons}
                    </div>
                </div>
                <div sx={styles.section}>
                    <div sx={styles.image}>
                        {category === 'Video' ? (
                            <VideoEmbed
                                name="youtube"
                                argument={[
                                    { value: parseUndefinedValue(videoId) },
                                ]}
                            />
                        ) : (
                            <PodcastPlayer
                                podcastFileUrl={parseUndefinedValue(
                                    podcastFileUrl
                                )}
                            />
                        )}
                    </div>
                    {!previewMode && ratingSection}
                </div>
                <div sx={styles.bodySection}>
                    <>
                        <TypographyScale
                            variant="body1"
                            sx={{
                                ...styles.vidOrPodContent,
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            {parse(parseUndefinedValue(description))}
                        </TypographyScale>
                        {relevantLinks && (
                            <TypographyScale
                                variant="body1"
                                sx={{
                                    ...styles.vidOrPodContent,
                                    display: 'block',
                                    marginTop: 'inc40',
                                }}
                            >
                                {parse(parseUndefinedValue(relevantLinks))}
                            </TypographyScale>
                        )}
                        <Link
                            linkIcon="arrow"
                            href={
                                category === 'Video'
                                    ? '/developer/videos'
                                    : 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624'
                            }
                            sx={{
                                display: 'block',
                                marginTop: 'inc40',
                            }}
                        >
                            {category === 'Video'
                                ? 'All MongoDB Videos'
                                : 'All MongoDB Podcasts'}
                        </Link>
                    </>
                </div>
                {contentFooter}
            </>
        );
    }

    function DefaultContent() {
        const isCodeExample = category === 'Code Example';
        const contentAst: any = parseMarkdownToAST(content || '');
        const headingNodes = getTableOfContents(
            'children' in contentAst ? contentAst['children'] : [],
            'type',
            'heading',
            2,
            -1
        );

        return (
            <>
                <div sx={styles.section}>
                    {displayTitle}
                    <div sx={styles.defaultHeaderGrid}>
                        <AuthorLockup
                            authors={parseAuthorsToAuthorLockup(authors)}
                            title={displayDate}
                            expandedNames
                            clickableLinks
                            size="large"
                            sx={{ gridArea: 'authordate' }}
                        />
                        {tags && (
                            <TagSection
                                tags={tags}
                                sx={{
                                    gridArea: 'tags',
                                    ...(isCodeExample && {
                                        display: [
                                            'flex',
                                            null,
                                            null,
                                            null,
                                            'none',
                                        ],
                                    }),
                                }}
                            />
                        )}
                        {codeType && (
                            <SecondaryTag codeLevel={codeType as CodeLevel} />
                        )}
                        {displaySocialButtons}
                    </div>
                </div>
                <div sx={styles.section}>
                    <div sx={styles.image}>
                        <Image
                            alt={parseUndefinedValue(image?.alt)}
                            src={getPlaceHolderImage(image?.url)}
                            sx={{
                                borderRadius: 'inc30',
                                objectFit: 'cover',
                            }}
                            layout="fill"
                        />
                    </div>
                    {!previewMode && ratingSection}
                    {isCodeExample &&
                        (githubUrl || liveSiteUrl) &&
                        renderExternalExamples({
                            marginTop: 'inc50',
                            marginBottom: ['', null, null, '-inc40'], // negates marginTop from contentBody since externalExamples might not always be present
                        })}
                </div>
                <div sx={styles.bodySection}>
                    <DocumentBody content={contentAst} />
                    {isCodeExample &&
                        (githubUrl || liveSiteUrl) &&
                        renderExternalExamples({ marginTop: 'inc40' })}
                </div>
                {contentFooter}
                <div sx={styles.floatingMenu}>
                    {isCodeExample && tags && (
                        <div sx={{ marginBottom: 'inc90' }}>
                            <TypographyScale
                                variant="heading6"
                                sx={{ marginBottom: 'inc30' }}
                            >
                                Technologies Used
                            </TypographyScale>
                            <TagSection withLabels tags={tags} />
                        </div>
                    )}
                    {headingNodes.length > 0 && (
                        <TableOfContents
                            headingNodes={headingNodes}
                            sx={{ position: 'sticky', top: 'inc150' }}
                        />
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            <NextSeo
                title={`${title} | MongoDB`}
                twitter={{
                    site: seo?.twitter_site,
                    handle: seo?.twitter_creator,
                }}
                openGraph={{
                    url: seo?.og_url,
                    title: seo?.og_title,
                    type: seo?.og_type,
                    description: seo?.og_description,
                    images: seo?.og_image?.url
                        ? [{ url: seo?.og_image?.url }]
                        : [],
                }}
                description={
                    seo?.meta_description ||
                    publicRuntimeConfig.pageDescriptions['/']
                }
                canonical={
                    seo?.canonical_url ||
                    getCanonicalUrl(
                        publicRuntimeConfig.absoluteBasePath,
                        asPath
                    )
                }
            />
            <h1>Main Content Page</h1>
            <div sx={styles.wrapper}>
                <GridLayout sx={{ rowGap: 0 }}>
                    <div sx={sideNavStyles(5)}>
                        <a href={getURLPath(topicSlug)}>
                            <TypographyScale
                                variant="heading6"
                                sx={sideNavTitleStyles}
                            >
                                {topicName}
                            </TypographyScale>
                        </a>
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    <Breadcrumbs crumbs={crumbs} sx={styles.breadcrumbs} />
                    {isVideoOrPodcastContent ? (
                        <VideoOrPodcastContent />
                    ) : (
                        <DefaultContent />
                    )}
                </GridLayout>
            </div>
            <FeedbackModal
                setModalStage={setFeedbackModalStage}
                modalStage={feedbackModalStage}
                stars={ratingStars}
                contentCategory={category}
                feedbackId={feedbackId}
            />
            {hasRequestContentFlow && (
                <RequestContentModal contentCategory={category} />
            )}
        </>
    );
};

export default ContentPageTemplate;
