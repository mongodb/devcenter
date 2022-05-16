import type { NextPage, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import { useState } from 'react';

import {
    GridLayout,
    SideNav,
    TypographyScale,
    HorizontalRule,
    Eyebrow,
    Button,
} from '@mdb/flora';

import Card, { getCardProps } from '../components/card';
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
import { thumbnailLoader } from '../components/card/utils';
import { getAllContentItems } from '../service/get-all-content';
import SeriesCard from '../components/series-card';
import SocialButtons from '../components/social-buttons';
import AuthorLockup from '../components/author-lockup';
import parse from 'html-react-parser';
import { PillCategory } from '../types/pill-category';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { VideoEmbed } from '../components/article-body/body-components/video-embed';
import { getPlaceHolderImage } from '../utils/get-place-holder-thumbnail';
import PodcastPlayer from '../components/podcast-player/podcast-player';
import { parseAuthorsToAuthorLockup } from '../utils/parse-authors-to-author-lockup';
import { CollectionType } from '../types/collection-type';
import { setURLPathForNavItems } from '../utils/format-url-path';

interface ContentPageProps {
    contentItem: ContentItem;
    tertiaryNavItems: TertiaryNavItem[];
}

const sideNavStyles = {
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    gridRow: 'span 4',
};

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

const ContentPage: NextPage<ContentPageProps> = ({
    contentItem,
    tertiaryNavItems,
}) => {
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
    } = contentItem;
    const [ratingStars, setRatingStars] = useState(0);

    const [feedbackModalStage, setFeedbackModalStage] =
        useState<feedbackModalStages>('closed');
    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    // const relatedContent = getRelatedContent(slug);
    // const slugList = slug.split('/');

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
                <Eyebrow sx={{ marginBottom: ['inc20', null, null, 'inc30'] }}>
                    {category}
                </Eyebrow>
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
                {!vidOrPod && ratingSection}
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
                    {!vidOrPod && ratingSection}
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
                {/*<Grid gap={['inc30', null, 'inc40']} columns={[1, null, 2]}>*/}
                {/*    {relatedContent.map(piece => (*/}
                {/*        <Card*/}
                {/*            key={piece.slug}*/}
                {/*            {...getCardProps(piece, 'related')}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</Grid>*/}
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

    return (
        <>
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
                    <div sx={sideNavStyles}>
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>

                    {contentHeader}
                    {contentBody}
                    {contentFooter}
                    {!vidOrPod && (
                        <div
                            sx={{
                                display: ['none', null, null, null, 'block'],
                                gridColumn: '10 /span 3',
                                gridRow: '2 /4',
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

const removesErroringArticles = (contents: ContentItem[]) => {
    const removeItems = [
        'PyMongoArrow: Bridging the Gap Between MongoDB and Your Data Analysis App',
        'new-time-series-collections',
        'mongodb-charts-embedding-sdk-react/',
        'build-movie-search-application',
    ];

    return contents.filter(content => !removeItems.includes(content.title));
};

export const getStaticPaths = async () => {
    const contents: ContentItem[] = await getAllContentItems();
    const filteredContents = removesErroringArticles(contents);

    const paths = filteredContents.map((content: ContentItem) => ({
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

    if (vidOrPod) {
        if (contentItem.primaryTag?.programmingLanguage) {
            sideNavFilterSlug =
                contentItem.primaryTag.programmingLanguage.calculatedSlug;
        }
        if (contentItem.primaryTag?.l1Product) {
            sideNavFilterSlug = contentItem.primaryTag.l1Product.calculatedSlug;
        }
    }
    let tertiaryNavItems = await getSideNav(sideNavFilterSlug);
    setURLPathForNavItems(tertiaryNavItems);

    const data = {
        contentItem,
        tertiaryNavItems,
    };

    return { props: data };
};
