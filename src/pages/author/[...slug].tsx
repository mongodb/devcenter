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

interface AuthorPageProps {
    name: string;
    bio?: string;
    image?: Image;
    location?: string;
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
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 12'],
    marginBottom: ['inc20', null, null, 'inc30'],
};

const contentStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 12'],
};

const AuthorPage: NextPage<AuthorPageProps> = ({
    name,
    bio,
    image,
    calculated_slug,
    articles,
}) => {
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
                    <Eyebrow sx={eyebrowStyles}>Developer Topics</Eyebrow>
                    <div sx={middleSectionStyles}>
                        <SpeakerLockup
                            profileImage={{
                                src: image
                                    ? image.url
                                    : 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_7a04dd64b1.png',
                                alt: 'Random people avatar',
                            }}
                        />
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc30'],
                            }}
                        >
                            {name}
                        </TypographyScale>
                        <TypographyScale
                            variant="body1"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc30'],
                            }}
                        >
                            {bio}
                        </TypographyScale>
                    </div>
                    <div sx={contentStyles}>
                        {articles &&
                            articles.map(article => {
                                const cardProps = getCardProps(
                                    article,
                                    'medium'
                                );
                                return (
                                    <Card key={article.slug} {...cardProps} />
                                );
                            })}
                    </div>
                </GridLayout>
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
        linkedin: author.linkedin,
        facebook: author.facebook,
        twitter: author.twitter,
        youtube: author.youtube,
        articles: filteredContent,
        calculated_slug: author.calculated_slug,
    };

    return { props: data };
};
