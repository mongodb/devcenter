import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { PillCategory } from '../../types/pill-category';
import { CollectionType } from '../../types/collection-type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useState } from 'react';
import axios from 'axios';
import FeedbackModal, {
    feedbackModalStages,
} from '../../components/feedback-modal';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { constructDateDisplay } from '../../utils/format-date';
import { parseMarkdownToAST } from '../../utils/markdown-parser/parse-markdown-to-ast';
import { getTableOfContents } from '../../utils/markdown-parser/get-table-of-contents';
import { parseAuthorsToAuthorLockup } from '../../utils/parse-authors-to-author-lockup';
import { addExternalIconToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import ContentRating from '../../components/content-rating';
import {
    Button,
    ESystemIconNames,
    GridLayout,
    HorizontalRule,
    Link,
    SideNav,
    TypographyScale,
} from '@mdb/flora';
import AuthorLockup from '../../components/author-lockup';
import TagSection from '../../components/tag-section';
import SecondaryTag from '../../components/card/secondary-tag';
import { CodeLevel } from '../../types/tag-type';
import SocialButtons from '../../components/social-buttons';
import PodcastPlayer from '../../components/podcast-player/podcast-player';
import { VideoEmbed } from '../../components/article-body/body-components/video-embed';
import { getPlaceHolderImage } from '../../utils/get-place-holder-thumbnail';
import Image from 'next/image';
import { getCardProps, thumbnailLoader } from '../../components/card/utils';
import parse from 'html-react-parser';
import { DocumentBody } from '../../components/article-body/document-body';
import SeriesCard from '../../components/series-card';
import { Grid, ThemeUICSSObject } from 'theme-ui';
import Card from '../../components/card';
import { NextSeo } from 'next-seo';
import {
    sideNavStyles,
    sideNavTitleStyles,
} from '../../components/tertiary-nav/styles';
import { getURLPath } from '../../utils/format-url-path';
import Breadcrumbs from '../../components/breadcrumbs';
import { TableOfContents } from '../../components/article-body/table-of-contents';
import { IRating } from '../../components/feedback-modal/types';

import { normalizeCategory } from './util';

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    relatedContent: ContentItem[];
    previewMode?: boolean;
}

const imageStyles = {
    marginBottom: ['inc20', null, null, 'inc30'],
    aspectRatio: '16/9',
    position: 'relative' as 'relative',
};

const headerGridStyles = (vidOrPod: boolean) => ({
    display: 'grid',
    gridTemplateAreas: [
        `
        "authordate"
        "tags"
        "social"
    `,
        null,
        vidOrPod
            ? `
        "authordate authordate"
        "tags social"
        `
            : `
        "authordate social"
        "tags tags"
    `,
    ],
    alignItems: 'center',
    rowGap: ['inc30', null, null, 'inc40'],
    marginBottom: ['inc30', null, null, 'inc40'],
});

const footerRatingStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'center'],
    flexDirection: ['column' as 'column', null, 'row' as 'row'],
    gap: 'inc30',
    marginTop: ['inc30', null, null, 'inc40'],
};

const middleSectionStyles = {
    maxWidth: '100%', // patches a Codemirror bug on FF https://github.com/codemirror/CodeMirror/issues/4142.
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 /span 6'],
};

const parseUndefinedValue = (description: string | undefined): string => {
    return description ? description : '';
};

const getCtaTextForVideosOrPodcasts = (category: PillCategory) => {
    return category === 'Video' ? 'All MongoDB Videos' : 'All MongoDB Podcasts';
};

const getCtaLinkForVideosOrPodcasts = (category: PillCategory) => {
    return category === 'Video'
        ? '/developer/videos'
        : 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624';
};
export const determineVideoOrPodcast = (
    collectionType: CollectionType | undefined
) => {
    return collectionType === 'Video' || collectionType === 'Podcast';
};

const ContentPageTemplate: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    relatedContent,
    previewMode,
}) => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const {
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
    } = contentItem;
    const [ratingStars, setRatingStars] = useState(0);
    const [feedbackId, setFeedbackId] = useState<string>('');

    const [feedbackModalStage, setFeedbackModalStage] =
        useState<feedbackModalStages>('closed');
    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(category) ? 'an' : 'a'
    } ${category}`; // Regex to tell if it starts with a vowel.

    const vidOrPod = determineVideoOrPodcast(collectionType);

    const displayDate = constructDateDisplay(vidOrPod, contentDate, updateDate);

    const contentAst: any = vidOrPod ? {} : parseMarkdownToAST(content || '');

    const headingNodes = getTableOfContents(
        'children' in contentAst ? contentAst['children'] : [],
        'type',
        'heading',
        2,
        -1
    );

    const isCodeExample = category === 'Code Example';

    const authorsToDisplay = parseAuthorsToAuthorLockup(authors);

    const hasRequestContentFlow =
        !previewMode && category !== 'News & Announcements';

    tertiaryNavItems = addExternalIconToSideNav(
        tertiaryNavItems,
        'documentation'
    );

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

    const renderExternalExamples = (styles: ThemeUICSSObject = {}) => (
        <div
            sx={{
                display: 'flex',
                columnGap: [0, 'inc70'],
                flexDirection: ['column', 'row'],
                alignItems: ['start', 'center'],
                ...styles,
            }}
        >
            {githubUrl && (
                <Button
                    hasIcon
                    href={githubUrl}
                    target="_blank"
                    variant="secondary"
                    iconName={ESystemIconNames.EXTERNAL}
                    sx={{
                        width: 'auto',
                    }}
                >
                    View Code
                </Button>
            )}
            {liveSiteUrl && (
                <Link
                    linkIcon="arrow"
                    href={liveSiteUrl}
                    sx={{
                        marginTop: ['inc30', 0],
                    }}
                >
                    Try it
                </Link>
            )}
        </div>
    );

    const contentHeader = (
        <>
            <div sx={middleSectionStyles}>
                <TypographyScale
                    customElement="h1"
                    variant="heading2"
                    sx={{
                        marginBottom: ['inc20', null, null, 'inc30'],
                    }}
                >
                    {title}
                </TypographyScale>
                <div sx={headerGridStyles(vidOrPod)}>
                    <div
                        sx={{
                            gridArea: 'authordate',
                        }}
                    >
                        {!vidOrPod ? (
                            <div>
                                <AuthorLockup
                                    authors={authorsToDisplay}
                                    title={displayDate}
                                    expandedNames
                                    clickableLinks
                                    size="large"
                                />
                            </div>
                        ) : (
                            <TypographyScale
                                variant="body3"
                                color="secondary"
                                customStyles={{
                                    display: 'block',
                                    marginBottom: vidOrPod ? 0 : 'inc30',
                                }}
                            >
                                {displayDate}
                            </TypographyScale>
                        )}
                    </div>
                    <div
                        sx={{
                            gridArea: 'tags',
                            ...(isCodeExample && {
                                display: ['flex', null, null, null, 'none'],
                            }),
                        }}
                    >
                        {tags && <TagSection tags={tags} />}
                    </div>
                    {codeType && (
                        <SecondaryTag codeLevel={codeType as CodeLevel} />
                    )}
                    {!previewMode && (
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
                    )}
                </div>
            </div>
            <div sx={middleSectionStyles}>
                <div sx={imageStyles}>
                    {category === 'Podcast' && (
                        <PodcastPlayer
                            podcastFileUrl={parseUndefinedValue(podcastFileUrl)}
                        />
                    )}
                    {category === 'Video' && (
                        <VideoEmbed
                            argument={[{ value: parseUndefinedValue(videoId) }]}
                            name="youtube"
                            thumbnail={getPlaceHolderImage(image?.url)}
                        />
                    )}
                    {!vidOrPod && (
                        <Image
                            alt={parseUndefinedValue(image?.alt)}
                            src={getPlaceHolderImage(image?.url)}
                            loader={thumbnailLoader}
                            sx={{
                                borderRadius: 'inc30',
                                objectFit: 'cover',
                            }}
                            layout="fill"
                        />
                    )}
                </div>
                {!previewMode && ratingSection}
                {isCodeExample &&
                    (githubUrl || liveSiteUrl) &&
                    renderExternalExamples({
                        marginTop: 'inc50',
                        marginBottom: ['', null, null, '-inc40'], // negates marginTop from contentBody since externalExamples might not always be present
                    })}
            </div>
        </>
    );

    const contentBody = (
        <div
            sx={{
                ...middleSectionStyles,
                my: ['section20', null, 'section30', 'section40'],
            }}
        >
            {vidOrPod && (
                <TypographyScale
                    variant="body1"
                    sx={{
                        marginBottom: ['inc20', null, null, 'inc40'],
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {parse(parseUndefinedValue(description))}
                </TypographyScale>
            )}
            {vidOrPod && (
                <Link
                    linkIcon="arrow"
                    href={getCtaLinkForVideosOrPodcasts(category)}
                    sx={{
                        display: 'block',
                        marginTop: 'inc40',
                    }}
                >
                    {getCtaTextForVideosOrPodcasts(category)}
                </Link>
            )}
            {!vidOrPod && <DocumentBody content={contentAst} />}
            {isCodeExample &&
                (githubUrl || liveSiteUrl) &&
                renderExternalExamples({ marginTop: 'inc40' })}
        </div>
    );

    const contentFooter = (
        <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: ['section30', null, 'section40', 'section50'],
                ...middleSectionStyles,
            }}
        >
            <div>
                <HorizontalRule />
                {!previewMode && (
                    <div sx={footerRatingStyles}>
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
                <div sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => setRequestContentModalStage('text')}
                        variant="secondary"
                    >
                        {requestButtonText}
                    </Button>
                </div>
            )}
        </div>
    );

    const og: any = {
        url: seo?.og_url,
        title: seo?.og_title,
        type: seo?.og_type,
        description: seo?.og_description,
    };

    og['images'] = seo?.og_image?.url ? [{ url: seo?.og_image?.url }] : [];

    const twitter: any = {
        handle: seo?.twitter_creator,
        site: seo?.twitter_site,
    };
    const canonicalUrl =
        seo?.canonical_url ||
        publicRuntimeConfig.absoluteBasePath + router.asPath;
    const metaDescription =
        seo?.meta_description || publicRuntimeConfig.pageDescriptions['/'];

    return (
        <>
            <NextSeo
                title={`${title} | MongoDB`}
                description={metaDescription}
                canonical={canonicalUrl}
                openGraph={og}
                twitter={twitter}
            />
            <div
                sx={{
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
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
                    <Breadcrumbs
                        crumbs={crumbs}
                        sx={{
                            marginBottom: ['inc20', null, null, 'inc30'],
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                'span 9',
                            ],
                        }}
                    />
                    {contentHeader}
                    {contentBody}
                    {contentFooter}
                    {!vidOrPod && (
                        <div
                            sx={{
                                display: ['none', null, null, null, 'block'],
                                gridColumn: '10 /span 3',
                                gridRow: '3 / 5',
                                paddingLeft: 'inc70',
                            }}
                        >
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
                <RequestContentModal
                    setModalStage={setRequestContentModalStage}
                    modalStage={requestContentModalStage}
                    contentCategory={category}
                />
            )}
        </>
    );
};

export default ContentPageTemplate;
