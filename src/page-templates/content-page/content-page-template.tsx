// libraries
import axios from 'axios';
import Image from 'next/image';
import { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
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
import FeedbackModal from '../../components/modal/feedback';
import Card from '../../components/card';
import SeriesCard from '../../components/series-card';
import TagSection from '../../components/tag-section';
import Breadcrumbs from '../../components/breadcrumbs';
import EventWidget from '../../components/event-widget';
import AuthorLockup from '../../components/author-lockup';
import { getCardProps } from '../../components/card/utils';
import ContentRating from '../../components/content-rating';
import SocialButtons from '../../components/social-buttons';
import SecondaryTag from '../../components/card/secondary-tag';
import RequestContentModal from '../../components/modal/request-content';
import PodcastPlayer from '../../components/podcast-player/podcast-player';
import { DocumentBody } from '../../components/article-body/document-body';
import { TableOfContents } from '../../components/article-body/table-of-contents';
import { VideoEmbed } from '../../components/article-body/body-components/video-embed';
// context
import { useModalContext } from '../../contexts/modal';
// types
import { Crumb } from '../../components/breadcrumbs/types';
import { ContentItem } from '../../interfaces/content-item';
import {
    FEEDBACK_MODAL_STAGE,
    IRating,
} from '../../components/modal/feedback/types';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
// utils
import { normalizeCategory } from './util';
import { getCanonicalUrl } from '../../utils/seo';
import { getURLPath } from '../../utils/format-url-path';
import { constructDateDisplay } from '../../utils/format-date';
import { getTweetText } from '../../components/social-buttons/utils';
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
import { FullApplication, Snippet } from '../../components/icons';
import { iconStyles } from '../../components/topic-cards-container/styles';
import { formatEventTypes } from '../../utils/format-text';

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
        authors = [],
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
        // event specific
        location,
        eventSetup,
        virtualLink,
        registrationLink,
        virtualLinkText,
    },
}) => {
    const router = useRouter();
    const { asPath } = router;
    const { publicRuntimeConfig } = getConfig();
    const { openModal } = useModalContext();

    const [ratingStars, setRatingStars] = useState(0);
    const [pageUrl, setPageUrl] = useState('');
    const [feedbackId, setFeedbackId] = useState<string>('');

    useEffect(() => {
        setPageUrl(window.location.href);
    }, []);

    const requestButtonText = getRequestBtnText(category);

    const isIndustryEvent = category === 'Event';
    const isVideoOrPodcastContent =
        collectionType === 'Video' || collectionType === 'Podcast';

    const displayDate = constructDateDisplay(
        isVideoOrPodcastContent,
        contentDate as string,
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

    const getSocialButtons = (isHeaderBtns = false) => {
        if (previewMode) {
            return null;
        }

        const tweetBody = getTweetText(authors, title, tags);

        return (
            <SocialButtons
                copyUrl={pageUrl}
                facebook={{
                    url: `https://www.facebook.com/sharer.php?u=${pageUrl}`,
                    title: 'Share on Facebook',
                }}
                twitter={{
                    url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${tweetBody}`,
                    title: 'Share on Twitter',
                }}
                linkedIn={{
                    url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${title}&summary=${title}&source=MongoDB`,
                    title: 'Share on LinkedIn',
                }}
                sx={{
                    ...(isHeaderBtns && {
                        gridArea: 'social',
                        justifySelf: ['start', null, 'end'],
                    }),
                }}
            />
        );
    };

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
        openModal(
            <FeedbackModal
                stars={stars}
                feedbackId={feedbackId}
                contentCategory={category}
                initialStage={
                    stars === 3
                        ? FEEDBACK_MODAL_STAGE.TEXT
                        : FEEDBACK_MODAL_STAGE.CHECKBOX
                }
            />
        );
    };

    const ratingSection = (
        <div sx={styles.ratingSection}>
            <span>Rate this {normalizeCategory(category)}</span>
            <ContentRating stars={ratingStars} onRate={onRate} />
        </div>
    );

    const renderExternalExamples = (addtlStyles: ThemeUICSSObject = {}) => (
        <div sx={{ ...styles.externalExamples, ...addtlStyles }}>
            {githubUrl && (
                <Button
                    hasIcon
                    href={githubUrl}
                    target="_blank"
                    variant="secondary"
                    iconName={ESystemIconNames.SOCIAL_GITHUB}
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
                        {getSocialButtons()}
                        {!isIndustryEvent && ratingSection}
                    </div>
                )}
            </div>
            {series && <SeriesCard series={series} currentTitle={title} />}
            {relatedContent.length > 0 && (
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
            )}
            {hasRequestContentFlow && (
                <Button
                    variant="secondary"
                    sx={styles.requestBtn}
                    onClick={() =>
                        openModal(
                            <RequestContentModal contentCategory={category} />
                        )
                    }
                >
                    {requestButtonText}
                </Button>
            )}
        </div>
    );

    const VideoOrPodcastContent = () => (
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
                    {getSocialButtons(true)}
                </div>
            </div>
            <div sx={styles.section}>
                <div sx={styles.image}>
                    {category === 'Video' ? (
                        <VideoEmbed
                            name="youtube"
                            argument={[{ value: parseUndefinedValue(videoId) }]}
                        />
                    ) : (
                        <PodcastPlayer
                            podcastFileUrl={parseUndefinedValue(podcastFileUrl)}
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

    const DefaultContent = () => {
        const isCodeExample = category === 'Code Example';
        const contentAst: any = parseMarkdownToAST(content || '');
        const headingNodes = getTableOfContents(
            'children' in contentAst ? contentAst['children'] : [],
            'type',
            'heading',
            2,
            -1
        );
        // Industry Events header images are optional
        const displayHeaderImage = !isIndustryEvent || image?.url;

        const tagsSection = tags ? (
            <TagSection
                tags={tags}
                sx={{
                    gridArea: 'tags',
                    paddingRight: 'inc30',
                    ...(isCodeExample && {
                        display: ['flex', null, null, null, 'none'],
                    }),
                }}
            />
        ) : null;

        const defaultHeader = (
            <div sx={styles.defaultHeaderGrid}>
                <AuthorLockup
                    authors={parseAuthorsToAuthorLockup(authors)}
                    title={displayDate}
                    expandedNames
                    clickableLinks
                    size="large"
                    sx={{ gridArea: 'authordate' }}
                />
                {tagsSection}
                {codeType && (
                    <SecondaryTag
                        icon={
                            codeType === 'Snippet' ? (
                                <Snippet sx={iconStyles} />
                            ) : (
                                <FullApplication sx={iconStyles} />
                            )
                        }
                    >
                        {codeType.toUpperCase()}
                    </SecondaryTag>
                )}
                {getSocialButtons(true)}
            </div>
        );

        const eventHeader = (
            <div sx={styles.eventHeaderGrid}>
                {tagsSection}
                {getSocialButtons(true)}
                <TypographyScale variant="body2" sx={{ gridArea: 'eventType' }}>
                    Industry Event | {formatEventTypes(eventSetup)}
                </TypographyScale>
            </div>
        );

        return (
            <>
                <div sx={styles.section}>
                    {displayTitle}
                    {isIndustryEvent ? eventHeader : defaultHeader}
                </div>
                <div sx={styles.section}>
                    {displayHeaderImage && (
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
                    )}
                    {!previewMode && !isIndustryEvent && ratingSection}
                    {isCodeExample &&
                        (githubUrl || liveSiteUrl) &&
                        renderExternalExamples({
                            marginTop: 'inc50',
                            marginBottom: ['', null, null, '-inc40'], // negates marginTop from contentBody since externalExamples might not always be present
                        })}
                    {isIndustryEvent && (
                        <EventWidget
                            dates={contentDate}
                            location={location}
                            virtualLink={virtualLink}
                            virtualLinkText={virtualLinkText}
                            registrationLink={registrationLink}
                            buttonStyles={{
                                marginTop: '-inc30', // negates marginTop from the component's internal styles
                                marginBottom: '-inc20', // negate spacing from content body
                                width: ['100%', null, null, 'auto'],
                            }}
                            wrapperStyles={{
                                display: ['block', null, null, 'none'],
                                marginTop: 'inc40',
                            }}
                        />
                    )}
                </div>
                <div sx={styles.bodySection}>
                    <DocumentBody content={contentAst} />
                    {isIndustryEvent && authors.length > 0 && (
                        <>
                            <TypographyScale
                                variant="heading5"
                                sx={{
                                    marginTop: 'inc60',
                                    marginBottom: 'inc40',
                                }}
                            >
                                Speakers
                            </TypographyScale>
                            {authors.map(author => (
                                <Fragment key={author.title}>
                                    <AuthorLockup
                                        authors={parseAuthorsToAuthorLockup([
                                            author,
                                        ])}
                                        title={author.title}
                                        size="large"
                                    />
                                    <TypographyScale
                                        variant="body1"
                                        customElement="p"
                                        sx={{
                                            paddingTop: 'inc20',
                                            paddingLeft: [
                                                'inc80',
                                                '',
                                                null,
                                                'inc110',
                                            ],
                                            paddingBottom: ['inc60'],
                                            '&:last-of-type': {
                                                paddingBottom: 0,
                                            },
                                        }}
                                    >
                                        {author.bio}
                                    </TypographyScale>
                                </Fragment>
                            ))}
                            <Button
                                href={registrationLink}
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: ['inc40', 'inc50', null],
                                }}
                                customWrapperStyles={{
                                    display: ['block', null, null, 'none'],
                                    width: ['100%', null, null, 'auto'],
                                }}
                            >
                                Register Now
                            </Button>
                        </>
                    )}
                    {isCodeExample &&
                        (githubUrl || liveSiteUrl) &&
                        renderExternalExamples({ marginTop: 'inc40' })}
                </div>
                {contentFooter}
                <div sx={styles.floatingMenu}>
                    {isIndustryEvent && (
                        <EventWidget
                            dates={contentDate}
                            location={location}
                            virtualLink={virtualLink}
                            virtualLinkText={virtualLinkText}
                            registrationLink={registrationLink}
                            wrapperStyles={{
                                position: 'sticky',
                                top: 'inc150',
                            }}
                        />
                    )}
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
    };

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
        </>
    );
};

export default ContentPageTemplate;
