import type { NextPage, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllAuthors } from '../../service/get-all-authors';
import { Author, Image } from '../../interfaces/author';
import {
    Eyebrow,
    GridLayout,
    SpeakerLockup,
    TypographyScale,
} from '@mdb/flora';
import React from 'react';
import Card, { getCardProps } from '../../components/card';
import { getAllContentItems } from '../../service/get-all-content';
import { ContentItem } from '../../interfaces/content-item';
import { Grid } from 'theme-ui';
import { getPlaceHolderImage } from '../../utils/get-place-holder-thumbnail';
import AuthorSocialButtons from '../../components/author-social-buttons';

interface AuthorPageProps {
    name: string;
    bio?: string;
    image?: Image;
    location?: string;
    title?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    calculated_slug: string;
    articles?: ContentItem[];
}

const middleSectionStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '3 /span 9'],
};
const eyebrowStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12'],
    marginBottom: ['inc70', null, null, 'inc100'],
};

const contentStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 12'],
    paddingTop: 'inc70',
};

const speakerStyles = {
    marginBottom: ['inc40'],
};

const getTitleAndLocation = (
    title: string | undefined,
    location: string | undefined
) => {
    if (title && location) {
        return title + '-' + location;
    } else if (title) {
        return title;
    } else if (location) {
        return location;
    } else {
        return null;
    }
};

const AuthorPage: NextPage<AuthorPageProps> = ({
    name,
    bio,
    image,
    location,
    title,
    linkedin,
    facebook,
    twitter,
    youtube,
    calculated_slug,
    articles,
}) => {
    const titleAndLocation = getTitleAndLocation(title, location);
    const hasSocial = facebook || twitter || linkedin || youtube;
    return (
        <>
            <div
                sx={{
                    //paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <Eyebrow sx={eyebrowStyles}>Developer Topics</Eyebrow>
                    <div sx={middleSectionStyles}>
                        <SpeakerLockup
                            sx={speakerStyles}
                            profileImage={{
                                src: image
                                    ? image.url
                                    : getPlaceHolderImage(undefined),
                                alt: 'Random people avatar',
                            }}
                        />
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: 'inc50',
                            }}
                        >
                            {name}
                        </TypographyScale>
                        {titleAndLocation && (
                            <TypographyScale
                                variant="body1"
                                sx={{
                                    display: 'block',
                                    color: 'black50',
                                    marginBottom: 'inc50',
                                }}
                            >
                                {titleAndLocation}
                            </TypographyScale>
                        )}
                        {bio && (
                            <TypographyScale
                                variant="body1"
                                sx={{
                                    display: 'block',
                                    marginBottom: [
                                        'inc70',
                                        null,
                                        null,
                                        'inc100',
                                    ],
                                }}
                            >
                                {bio}
                            </TypographyScale>
                        )}
                    </div>
                    {hasSocial && (
                        <div
                            sx={{
                                gridColumn: [
                                    'span 6',
                                    null,
                                    'span 8',
                                    'span 12',
                                    'span 12',
                                ],
                                marginBottom: 'inc40',
                            }}
                        >
                            <AuthorSocialButtons
                                facebookUrl={facebook}
                                linkedinUrl={linkedin}
                                twitterUrl={twitter}
                                youtubeUrl={youtube}
                            />
                        </div>
                    )}
                </GridLayout>
            </div>
            <div
                sx={{
                    backgroundColor: 'black10',
                }}
            >
                <div
                    sx={{
                        paddingBottom: 'inc160',
                        px: ['inc40', null, 'inc50', 'inc70'],
                    }}
                >
                    <GridLayout
                        sx={{
                            rowGap: 0,
                        }}
                    >
                        <div sx={contentStyles}>
                            <TypographyScale
                                variant="heading5"
                                sx={{
                                    marginBottom: 'inc40',
                                }}
                            >
                                Content by {name}
                            </TypographyScale>
                            <Grid
                                gap={['inc30', null, 'inc40']}
                                columns={[1, null, 2, 4]}
                            >
                                {articles &&
                                    articles.map(piece => (
                                        <Card
                                            sx={{ height: '100%' }}
                                            key={piece.slug}
                                            {...getCardProps(piece, 'small')}
                                        />
                                    ))}
                            </Grid>
                        </div>
                    </GridLayout>
                </div>
            </div>
        </>
    );
};

export default AuthorPage;

interface IParams extends ParsedUrlQuery {
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths = async () => {
    let paths: any[] = [];

    const authors: Author[] = await getAllAuthors();

    for (const author of authors) {
        const parsedSlug = author.calculated_slug.startsWith('/')
            ? author.calculated_slug.substring(1).split('/')
            : author.calculated_slug.split('/');
        const authorPath = parsedSlug[parsedSlug.length - 1];
        paths = paths.concat({
            params: { slug: [authorPath] },
        });
    }

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;

    const slugString = '/author/' + slug[0];

    const authors: Author[] = await getAllAuthors();

    const author = authors.filter(
        a => a.calculated_slug.toLowerCase() === slugString.toLowerCase()
    )[0];

    const articlesByAuthor = author.articles
        ? author.articles.map(articles => articles.name)
        : [];

    const allContent: ContentItem[] = await getAllContentItems();

    const filteredContent = allContent.filter(a =>
        articlesByAuthor.includes(a.title)
    );

    const data = {
        name: author.name,
        bio: author.bio,
        image: author.image,
        location: author.location,
        title: author.title,
        linkedin: author.linkedin,
        facebook: author.facebook,
        twitter: author.twitter,
        youtube: author.youtube,
        articles: filteredContent,
        calculated_slug: author.calculated_slug,
    };

    return { props: data };
};
