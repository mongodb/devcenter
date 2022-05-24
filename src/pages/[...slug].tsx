import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import React, { useState } from 'react';

import {
    Button,
    ESystemIconNames,
    GridLayout,
    HorizontalRule,
    SideNav,
    TypographyScale,
} from '@mdb/flora';

import TagSection from '../components/tag-section';
import ContentRating from '../components/content-rating';

import FeedbackModal, {
    feedbackModalStages,
} from '../components/feedback-modal';
import RequestContentModal, {
    requestContentModalStages,
} from '../components/request-content-modal';

import { DocumentBody } from '../components/article-body/document-body';
import { parseMarkdownToAST } from '../utils/markdown-parser/parse-markdown-to-ast';
import CTALink from '../components/hero/CTALink';
import { getTableOfContents } from '../utils/markdown-parser/get-table-of-contents';
import { TableOfContents } from '../components/article-body/table-of-contents';

import { constructDateDisplay } from '../utils/format-date';
import { ContentItem } from '../interfaces/content-item';
import { getCardProps, thumbnailLoader } from '../components/card/utils';
import { getAllContentItems } from '../service/get-all-content';
import SeriesCard from '../components/series-card';
import SocialButtons from '../components/social-buttons';
import AuthorLockup from '../components/author-lockup';
import parse from 'html-react-parser';
import { PillCategory, pillCategoryToSlug } from '../types/pill-category';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { VideoEmbed } from '../components/article-body/body-components/video-embed';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import PodcastPlayer from '../components/podcast-player/podcast-player';
import { parseAuthorsToAuthorLockup } from '../utils/parse-authors-to-author-lockup';
import { CollectionType } from '../types/collection-type';
import { getURLPath, setURLPathForNavItems } from '../utils/format-url-path';
import {
    sideNavTitleStyles,
    sideNavStyles,
} from '../components/tertiary-nav/styles';
import { getMetaInfoForTopic } from '../service/get-meta-info-for-topic';
import { getBreadcrumbsFromSlug } from '../components/breadcrumbs/utils';
import { Crumb } from '../components/breadcrumbs/types';
import Breadcrumbs from '../components/breadcrumbs';
import getRelatedContent from '../api-requests/get-related-content';
import { Grid } from 'theme-ui';
import Card from '../components/card';
import SecondaryTag from '../components/card/secondary-tag';
import { CodeLevel } from '../types/tag-type';
let pluralize = require('pluralize');

interface ContentPageProps {
    crumbs: Crumb[];
    topicSlug: string;
    topicName: string;
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
    relatedContent: ContentItem[];
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

const parseDescription = (description: string, category: PillCategory) => {
    return category === 'Podcast' ? parse(description) : description;
};

const determineVideoOrPodcast = (
    collectionType: CollectionType | undefined
) => {
    return collectionType === 'Video' || collectionType === 'Podcast';
};

const ratingSectionCondition = (category: PillCategory) => {
    return (
        category === 'Video' ||
        category === 'Podcast' ||
        category === 'News & Announcements' ||
        category === 'Code Example'
    );
};

const ContentPage: NextPage<ContentPageProps> = ({
    crumbs,
    topicSlug,
    topicName,
    contentItem,
    tertiaryNavItems,
    relatedContent,
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

    const authorsToDisplay = parseAuthorsToAuthorLockup(authors);

    const ratingSection = (
        <div
            sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
            }}
        >
            <span>Rate this {category.toLowerCase()}</span>
            <ContentRating
                stars={ratingStars}
                onRate={i => {
                    setRatingStars(i); // This should update both rating sections but it doesn't.
                    setFeedbackModalStage(i === 3 ? 'text' : 'checkbox');
                }}
            />
        </div>
    );

    const contentHeader = (
        <>
            <div sx={middleSectionStyles}>
                <TypographyScale
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
                    <div sx={{ gridArea: 'tags' }}>
                        {tags && <TagSection tags={tags} />}
                    </div>
                    {codeType && (
                        <SecondaryTag codeLevel={codeType as CodeLevel} />
                    )}
                    <SocialButtons
                        description={parseUndefinedValue(description)}
                        heading={title}
                        sx={{
                            gridArea: 'social',
                            justifySelf: ['start', null, 'end'],
                        }}
                    />
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
                {!ratingSectionCondition(category) && ratingSection}
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
                    {parseDescription(
                        parseUndefinedValue(description),
                        category
                    )}
                </TypographyScale>
            )}
            {vidOrPod && (
                <CTALink
                    customCSS={{
                        marginTop: 'inc40',
                    }}
                    text={getCtaTextForVideosOrPodcasts(category)}
                    url={getCtaLinkForVideosOrPodcasts(category)}
                />
            )}
            {!vidOrPod && <DocumentBody content={contentAst} />}
            <div
                sx={{
                    display: [null, 'flex'],
                    columnGap: [0, 'inc70'],
                    marginTop: ['inc40'],
                }}
            >
                {githubUrl && (
                    <Button
                        href={githubUrl}
                        target="_blank"
                        variant="secondary"
                        hasIcon
                        iconName={ESystemIconNames.HAMBURGER}
                    >
                        View Code
                    </Button>
                )}
                {liveSiteUrl && <CTALink text="Try it" url={liveSiteUrl} />}
            </div>
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
                <div sx={footerRatingStyles}>
                    <SocialButtons
                        description={parseUndefinedValue(description)}
                        heading={title}
                    />
                    {!ratingSectionCondition(category) && ratingSection}
                </div>
            </div>
            {series && (
                <SeriesCard
                    series={series}
                    currentSlug={slug}
                    currentTitle={title}
                />
            )}
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
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => setRequestContentModalStage('text')}
                    variant="secondary"
                >
                    {requestButtonText}
                </Button>
            </div>
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
    let canonicalUrl = seo?.canonical_url
        ? seo?.canonical_url
        : publicRuntimeConfig.absoluteBasePath + router.asPath;

    return (
        <>
            <NextSeo
                title={`${title} | MongoDB`}
                {...(seo?.meta_description && {
                    description: seo.meta_description,
                })}
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
                            }}
                        >
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
                slug={slug}
                title={title}
            />
            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={category}
            />
        </>
    );
};

export default ContentPage;

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

// const removesErroringArticles = (contents: ContentItem[]) => {
//     const removeItems = [
//         'PyMongoArrow: Bridging the Gap Between MongoDB and Your Data Analysis App',
//         'new-time-series-collections',
//         'mongodb-charts-embedding-sdk-react/',
//         'build-movie-search-application',
//     ];

//     return contents.filter(content => !removeItems.includes(content.title));
// };

export const getStaticPaths = async () => {
    const contents: ContentItem[] = await getAllContentItems();
    // const filteredContents = removesErroringArticles(contents);

    const paths = contents.map((content: ContentItem) => ({
        params: { slug: content.slug.split('/') },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const contents: ContentItem[] = await getAllContentItems();

    const contentItem = contents.filter(
        content => content.slug === slug.join('/')
    )[0];

    const vidOrPod = determineVideoOrPodcast(contentItem.collectionType);
    let sideNavFilterSlug = '/' + slug.slice(0, slug.length - 1).join('/');

    //this code examples start with /code-examples ignore first part and add languages in order to identify its primary tag
    if (contentItem.category === 'Code Example') {
        sideNavFilterSlug =
            '/languages/' + slug.slice(1, slug.length - 1).join('/');
    }

    if (vidOrPod) {
        if (contentItem.primaryTag?.programmingLanguage) {
            sideNavFilterSlug =
                contentItem.primaryTag.programmingLanguage.calculatedSlug;
        }
        if (contentItem.primaryTag?.l1Product) {
            sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
        }
    }

    const slugString = `${sideNavFilterSlug}/slug`; // Add "slug" so we get all crumbs up until this throwaway one.

    const crumbs = await getBreadcrumbsFromSlug(slugString);
    const contentTypeSlug = pillCategoryToSlug.get(contentItem.category);
    const topicContentTypeCrumb: Crumb = {
        text: pluralize(contentItem.category),
        url: `${crumbs[crumbs.length - 1].url}${contentTypeSlug}`,
    };
    crumbs.push(topicContentTypeCrumb);
    let tertiaryNavItems = await getSideNav(sideNavFilterSlug);
    setURLPathForNavItems(tertiaryNavItems);

    const metaInfoForTopic = await getMetaInfoForTopic(sideNavFilterSlug);
    const topicSlug = sideNavFilterSlug;
    const topicName = metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '';

    const relatedContent = getRelatedContent(
        sideNavFilterSlug,
        contents,
        contentItem.slug
    );

    const data = {
        crumbs,
        contentItem,
        tertiaryNavItems,
        topicSlug,
        topicName,
        relatedContent,
    };

    return { props: data };
};
