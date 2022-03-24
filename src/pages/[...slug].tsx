import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import {
    GridLayout,
    SideNav,
    Tag,
    TypographyScale,
    Panel,
    Button,
    List,
} from '@mdb/flora';

import CTALink from '../components/hero/CTALink';
import Card from '../components/card';
import { tagStyles, tagWrapperStyles } from '../components/card/styles';

import getL1Content from '../requests/get-l1-content';
import getRelatedContent from '../requests/get-related-content';
import getSeries from '../requests/get-series';
import getTertiaryNavItems from '../requests/get-tertiary-nav-items';

import { ContentPiece } from '../interfaces/content-piece';

import getContent from '../requests/get-content';

const sideNavStyles = (rowCount: number) => ({
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    // We have a variable amount of rows, but should have at least 3. If this is problematic, maybe we calculate the rows
    // before render and update this accordingly.
    gridRow: [null, null, null, null, `span ${rowCount}`],
});

const Topic: NextPage<ContentPiece> = ({
    authors,
    category,
    image,
    title,
    description,
    contentDate,
    tags,
    slug,
}) => {
    const relatedContent = getRelatedContent(slug);
    const series = getSeries(slug);
    const slugList = slug.split('/');
    const tertiaryNavItems = getTertiaryNavItems(slugList[slugList.length - 2]);
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
                    <div
                        sx={{
                            display: ['none', null, null, null, 'block'],
                            gridColumn: [
                                'span 6',
                                null,
                                'span 8',
                                'span 12',
                                'span 3',
                            ],
                            nav: {
                                position: 'static' as 'static',
                            },
                        }}
                    >
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
                        {/* <Breadcrumbs crumbs={crumbs} /> */}
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            {/* {name} */}
                        </TypographyScale>
                        <TypographyScale
                            customElement="h3"
                            variant="body4"
                            color="secondary"
                            sx={{
                                marginBottom: ['inc20', null, null, '16px'],
                                marginTop: ['inc20', null, null, '16px'],
                            }}
                        >
                            {description}
                        </TypographyScale>
                        {tags && (
                            <div sx={tagWrapperStyles}>
                                {tags?.map(tag => (
                                    <Tag
                                        key={tag}
                                        variant="small"
                                        sx={tagStyles}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        )}
                        <div sx={{ marginTop: '24px', marginBottom: '48px' }}>
                            <img
                                width="696"
                                height="391"
                                src="http://placehold.jp/696x391.png"
                                alt="test"
                            />
                        </div>

                        <TypographyScale
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
                        </Button>
                    </div>
                </GridLayout>
            </div>
        </>
    );
};

export default Topic;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const { content } = getL1Content('');
    const paths = content.map(({ slug }) => ({
        params: { slug: slug.split('/') },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;

    const contentPiece = getContent(slug);

    return { props: contentPiece };
};
