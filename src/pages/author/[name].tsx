import { Grid } from 'theme-ui';
import { NextSeo } from 'next-seo';
import * as Sentry from '@sentry/nextjs';
import { ParsedUrlQuery } from 'querystring';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { GridLayout, SpeakerLockup, TypographyScale } from '@mdb/flora';

import { CS_getAuthor } from '../../service/get-all-authors';
import allAuthorsPreval from '../../service/get-all-authors.preval';

import { Author, Image } from '../../interfaces/author';
import { ContentItem } from '../../interfaces/content-item';

import { getPlaceHolderImage } from '../../utils/get-place-holder-thumbnail';

import Breadcrumbs from '../../components/breadcrumbs';
import Card, { getCardProps } from '../../components/card';
import { Crumb } from '../../components/breadcrumbs/types';
import SocialButtons from '../../components/social-buttons';
import allContentPreval from '../../service/get-all-content.preval';

const crumbs: Crumb[] = [{ text: 'MongoDB Developer Center', url: '/' }];
interface AuthorPageProps {
    name: string;
    bio?: string;
    image?: Image;
    location?: string;
    title?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    calculated_slug: string;
    articles: ContentItem[];
}

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
    linkedin = '',
    facebook = '',
    twitter = '',
    articles,
}) => {
    const titleAndLocation = getTitleAndLocation(title, location);
    const hasSocial = facebook || twitter || linkedin;
    return (
        <>
            <NextSeo
                title={`${name} Articles | MongoDB`}
                {...(bio && {
                    description: bio,
                })}
            />
            <div
                sx={{
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <Breadcrumbs crumbs={crumbs} />
                    <div
                        sx={{
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                '3 /span 9',
                            ],
                        }}
                    >
                        <SpeakerLockup
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: ['inc40'],
                            }}
                            profileImage={{
                                src: image
                                    ? image.url
                                    : getPlaceHolderImage(undefined),
                                alt: 'Random people avatar',
                            }}
                        />
                        <TypographyScale
                            customElement="h1"
                            variant="heading2"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 'inc50',
                            }}
                        >
                            {name}
                        </TypographyScale>
                        {titleAndLocation && (
                            <TypographyScale
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
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
                                    display: 'flex',
                                    justifyContent: 'center',
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
                        <SocialButtons
                            sx={{
                                gridColumn: [
                                    'span 6',
                                    null,
                                    'span 8',
                                    'span 12',
                                ],
                                marginBottom: 'inc40',
                            }}
                            facebook={{
                                url: facebook,
                                title: "Author's Facebook Link",
                            }}
                            twitter={{
                                url: twitter,
                                title: "Author's Twitter Link",
                            }}
                            linkedIn={{
                                url: linkedin,
                                title: "Author's LinkedIn Link",
                            }}
                        />
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
                        <div
                            sx={{
                                gridColumn: [
                                    'span 6',
                                    null,
                                    'span 8',
                                    'span 12',
                                    'span 12',
                                ],
                                paddingTop: 'inc70',
                            }}
                        >
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
                                {articles.map(piece => (
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
    name: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    // All author pages ([name.tsx]) are not generated at build time.
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as IParams;
    const slugString = '/author/' + name;

    let author: Author | null;
    try {
        author = await CS_getAuthor(slugString);
    } catch (e) {
        Sentry.captureException(e);
        author = allAuthorsPreval.filter(
            a => a.calculated_slug === slugString
        )[0];
    }

    if (!author) {
        return {
            notFound: true,
        };
    }

    const authorContentItems = allContentPreval.filter(content =>
        content.authors?.find(
            contentAuthor =>
                contentAuthor.calculated_slug === author?.calculated_slug
        )
    );

    const data = {
        name: author.name,
        bio: author.bio,
        image: author.image ?? null,
        location: author.location,
        title: author.title,
        linkedin: author.linkedin,
        facebook: author.facebook,
        twitter: author.twitter,
        articles: authorContentItems,
        calculated_slug: author.calculated_slug,
    };

    return { props: data, revalidate: 900 };
};
