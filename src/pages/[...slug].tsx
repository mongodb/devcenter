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
    SpeakerLockup,
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
import { formatDateToDisplayDateFormat } from '../utils/format-date';
import { ContentItem } from '../interfaces/content-item';
import { thumbnailLoader } from '../components/card/utils';
import { getAllContentItems } from '../service/get-all-content';
import SeriesCard from '../components/series-card';
import { getAllArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';

const SocialButtons = <div>SOCIAL BUTTONS</div>;

const sideNavStyles = {
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
};

const imageStyles = {
    marginTop: 'inc40',
    marginBottom: ['inc20', null, null, 'inc30'],
    aspectRatio: '16/9',
    position: 'relative' as 'relative',
};

const socialFlexContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginBottom: ['inc30', null, null, 'inc40'],
};

const constructDateDisplay = (
    vidOrPod: boolean,
    contentDate: string,
    updateDate: string | undefined
) => {
    const date = `Published ${formatDateToDisplayDateFormat(
        new Date(contentDate)
    )}`;
    if (vidOrPod) {
        return date;
    }
    if (updateDate) {
        return date.concat(
            ` . Updated ${formatDateToDisplayDateFormat(new Date(updateDate))}`
        );
    }
};

const ContentPage: NextPage<ContentItem> = ({
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
}) => {
    const [ratingStars, setRatingStars] = useState(0);

    const [feedbackModalStage, setFeedbackModalStage] =
        useState<feedbackModalStages>('closed');
    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    // const relatedContent = getRelatedContent(slug);
    // const slugList = slug.split('/');
    // const tertiaryNavItems = getTertiaryNavItems(slugList[slugList.length - 2]);

    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(category) ? 'an' : 'a'
    } ${category}`; // Regex to tell if it starts with a vowel.

    const vidOrPod = category === 'Video' || category === 'Podcast';

    const displayDate = constructDateDisplay(vidOrPod, contentDate, updateDate);

    const contentAst: any = vidOrPod ? {} : parseMarkdownToAST(content || '');

    const headingNodes = getTableOfContents(
        'children' in contentAst ? contentAst['children'] : [],
        'type',
        'heading',
        2,
        -1
    );

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
            <Eyebrow sx={{ marginBottom: 'inc30' }}>{category}</Eyebrow>
            <TypographyScale
                variant="heading2"
                sx={{
                    marginBottom: ['inc20', null, null, 'inc30'],
                }}
            >
                {title}
            </TypographyScale>
            {!vidOrPod ? (
                <div sx={socialFlexContainerStyles}>
                    <SpeakerLockup
                        sx={{ whiteSpace: 'nowrap' }}
                        name={authors?.join(',')}
                        title={displayDate}
                    />
                    {SocialButtons}
                </div>
            ) : (
                <TypographyScale
                    variant="body3"
                    color="secondary"
                    customStyles={{
                        display: 'block',
                        marginBottom: 'inc30',
                    }}
                >
                    {displayDate}
                </TypographyScale>
            )}
            {tags && (
                <div sx={socialFlexContainerStyles}>
                    <TagSection tags={tags} />
                    {vidOrPod && SocialButtons}
                </div>
            )}
            {image && (
                <div sx={imageStyles}>
                    <Image
                        alt={image.alt}
                        src={image.url}
                        loader={thumbnailLoader}
                        sx={{
                            borderRadius: 'inc30',
                            objectFit: 'cover',
                        }}
                        layout="fill"
                    />
                </div>
            )}

            {!vidOrPod && ratingSection}
        </>
    );

    const contentBody = (
        <>
            {vidOrPod && (
                <TypographyScale
                    variant="body1"
                    sx={{
                        marginBottom: ['inc20', null, null, 'inc40'],
                    }}
                >
                    {description}
                </TypographyScale>
            )}
            {vidOrPod && (
                <CTALink
                    customCSS={{
                        marginTop: '24px',
                        marginBottom: '48px',
                    }}
                    text="All MongoDB Videos"
                    url="#"
                />
            )}
            {!vidOrPod && <DocumentBody content={contentAst} />}
        </>
    );

    const contentFooter = (
        <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: ['section30', null, 'section40', 'section50'],
            }}
        >
            <div>
                <HorizontalRule />
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {SocialButtons}
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
                        rowGap: ['inc90', null, null, 'inc130'],
                    }}
                >
                    {/*<div sx={sideNavStyles}>*/}
                    {/*    <SideNav currentUrl="#" items={tertiaryNavItems} />*/}
                    {/*</div>*/}
                    <div
                        sx={{
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                '4 /span 6',
                            ],
                        }}
                    >
                        {contentHeader}
                        {contentBody}
                        {contentFooter}
                    </div>
                    {!vidOrPod && (
                        <div
                            sx={{
                                display: ['none', null, null, null, 'block'],
                                gridColumn: '10 /span 3',
                            }}
                        >
                            {headingNodes.length > 0 && (
                                <TableOfContents headingNodes={headingNodes} />
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
    const removeSlugs = [
        'article/mongodb-charts-embedding-sdk-react/',
        'article/new-time-series-collections',
        'article/pymongoarrow-and-data-analysis',
        'article/build-movie-search-application',
    ];

    return contents.filter(content => !removeSlugs.includes(content.slug));
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

    //const sideNav = constructSideNav(primaryTag)
    const contentItem = contents.filter(
        content => content.slug === slug.join('/')
    )[0];
    if (
        !(
            contentItem.category === 'Video' ||
            contentItem.category === 'Podcast'
        )
    ) {
        //console.log("tags",contentItem.tags);

        console.log('*****');
        console.log('slug', contentItem.slug);
        console.log('tags', JSON.stringify(contentItem.tags));
        console.log('*****');
    }

    return { props: contentItem };
};
