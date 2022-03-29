import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import {
    GridLayout,
    SideNav,
    TypographyScale,
    Button,
    Lightbox,
    HorizontalRule,
    Eyebrow,
    SpeakerLockup,
} from '@mdb/flora';

import CTALink from '../components/hero/CTALink';
import Card from '../components/card';
import TagSection from '../components/tag-section';
import ContentRating from '../components/content-rating';
import FeedbackModal from '../components/feedback-modal';

import { modalStages } from '../components/feedback-modal/types';

import getL1Content from '../requests/get-l1-content';
import getRelatedContent from '../requests/get-related-content';
import getSeries from '../requests/get-series';
import getTertiaryNavItems from '../requests/get-tertiary-nav-items';

import { ContentPiece } from '../interfaces/content-piece';

import getContent from '../requests/get-content';

const SocialButtons = <div>Social</div>;

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

const ContentPage: NextPage<ContentPiece> = ({
    authors,
    category,
    image,
    title,
    description,
    contentDate,
    tags,
    slug,
}) => {
    const [ratingStars, setRatingStars] = useState(0);
    const [modalStage, setModalStage] = useState<modalStages>('closed');

    const relatedContent = getRelatedContent(slug);
    const series = getSeries(slug);
    const slugList = slug.split('/');
    const tertiaryNavItems = getTertiaryNavItems(slugList[slugList.length - 2]);

    const vidOrPod = category === 'Video' || category === 'Podcast';

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
                    setModalStage(i === 3 ? 'text' : 'checkbox');
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
                        name={authors?.join(',')}
                        title={`${contentDate}`}
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
                    {contentDate}
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

    const contentFooter = (
        <>
            {/* <HorizontalRule />
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {SocialButtons}
                {!vidOrPod && ratingSection}
            </div> */}
            {/* <TypographyScale
                            variant="body1"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            In a past post of this series, we showed how easy it
                            was to generate documentation for our frameworks and
                            libraries using DocC and the benefits of doing it.
                            We also saw the different content we can add, like
                            articles, how-tos, and references for our functions,
                            classes, and structs.
                        </TypographyScale>
                        <CTALink
                            customCSS={{
                                marginTop: '24px',
                                marginBottom: '48px',
                            }}
                            text="All MongoDB Videos"
                            url="#"
                        />
                        <hr />
                        <Panel
                            sx={{
                                marginTop: '96px',
                                marginBottom: '96px',
                                padding: '48px',
                            }}
                        >
                            <TypographyScale
                                color="selected"
                                variant="heading6"
                                sx={{
                                    marginBottom: [
                                        'inc20',
                                        null,
                                        null,
                                        'inc40',
                                    ],
                                }}
                            >
                                THIS IS PART OF A SERIES
                            </TypographyScale>
                            <TypographyScale
                                variant="heading5"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                {`DocC: Apple's Documentation Compiler`}
                            </TypographyScale>
                            <TypographyScale
                                variant="heading6"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                Up Next
                            </TypographyScale>
                            <TypographyScale
                                customElement="h2"
                                variant="body4"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            >
                                Continuously Building and Hosting our Swift DocC
                                Documentation using Github Actions and Netlify
                            </TypographyScale>
                            <Button
                                sx={{ marginBottom: '40px' }}
                                variant="secondary"
                            >
                                Continue
                            </Button>
                            <hr />
                            <TypographyScale
                                variant="heading6"
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '40px'],
                                }}
                            >
                                More in this series
                            </TypographyScale>
                            <List
                                glyph="circle"
                                items={series}
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            />
                        </Panel>
                        <TypographyScale variant="heading5">
                            Related
                        </TypographyScale>
                        {relatedContent.map(content => {
                            return (
                                <Card
                                    sx={{ marginBottom: '26px' }}
                                    key={content.title}
                                    title={content.title}
                                    description={content.description}
                                    contentDate={content.contentDate}
                                    pillCategory={content.category}
                                    variant="small"
                                    href={'/' + content.slug}
                                />
                            );
                        })}
                        <Button
                            sx={{ marginBottom: '40px' }}
                            variant="secondary"
                        >
                            Request a _____
                        </Button> */}
        </>
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
                    <div sx={sideNavStyles}>
                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
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
                        {/* CONTENT HERE */}
                        {contentFooter}
                    </div>
                </GridLayout>
            </div>
            <FeedbackModal
                setModalStage={setModalStage}
                modalStage={modalStage}
                stars={ratingStars}
                contentCategory={category}
                slug={slug}
            />
        </>
    );
};

export default ContentPage;

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const { content } = getL1Content();
    const paths = content.map(({ slug }) => ({
        params: { slug: slug.split('/') },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;

    const contentPiece = getContent(slug.join('/'));

    return { props: contentPiece };
};
