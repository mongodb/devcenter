import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { articleContent } from '../../data/article-content';
import { parseMarkdownToAST } from '../../utils/markdown-parser/parse-markdown-to-ast';
import { DocumentBody } from '../../components/article-body/document-body';

import {
    Button,
    GridLayout,
    List,
    Panel,
    SideNav,
    Tag,
    TypographyScale,
} from '@mdb/flora';
import TertiaryNav from '../../components/tertiary-nav';
import getTertiaryNavItems from '../../requests/get-tertiary-nav-items';
import Breadcrumbs from '../../components/breadcrumbs';
import { tagStyles, tagWrapperStyles } from '../../components/card/styles';
import Card from '../../components/card';

const nameContent =
    'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify';
const descriptionContent =
    'Published February 16, 2022  •  Updated February 16, 2022';
const tags = ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'];

const crumbs = [
    { text: 'MongoDB Developer Center', url: '/' },
    { text: 'Developer Topics', url: '/topics' },
    { text: 'Products', url: '/topics' },
];

const listItems = [
    'Adding Realm as a dependency to an iOS Framework',
    'Document our Realm-Powered Swift Frameworks using DocC',
    'Continuously Building and Hosting our Swift DocC Documentation using Github Actions and Netlify',
];

const RelatedContent = [
    {
        category: 'Demo App',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is a demo app',
        description: 'In this demo App',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'p1',
    },
    {
        category: 'Article',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is an article',
        description: 'In this article',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'p2',
    },
    {
        category: 'Tutorial',
        image: {
            alt: 'thumbnail',
            url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
        },
        title: 'This is a tutorial',
        description: 'Some tutorial',
        contentDate: new Date().toDateString(),
        tags: ['Atlas Data Lake', 'Realm Studio', 'Netlify', 'GITHUB'],
        featured: false,
        slug: 'p3',
    },
];

const tertiaryNavItems = getTertiaryNavItems('atlas');
interface IProps {
    slug: string;
    content: string;
}

const Article: NextPage<IProps> = ({ slug, content }) => {
    const contentAST = parseMarkdownToAST(content);
    const description = 'descriptiondescriptiondescription';
    const name = 'namenamename';
    return (
        <>
            <TertiaryNav items={tertiaryNavItems} topic="atlas" />
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
                        <Breadcrumbs crumbs={crumbs} />
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                marginBottom: ['inc20', null, null, 'inc40'],
                            }}
                        >
                            {name}
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
                        <DocumentBody content={contentAST} />
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
                                items={listItems}
                                sx={{
                                    marginBottom: ['inc20', null, null, '16px'],
                                    marginTop: ['inc20', null, null, '16px'],
                                }}
                            />
                        </Panel>
                        <TypographyScale variant="heading5">
                            Related
                        </TypographyScale>
                        {RelatedContent.map(content => {
                            return (
                                <Card
                                    sx={{ marginBottom: '26px' }}
                                    key={content.title}
                                    title={content.title}
                                    description={content.description}
                                    contentDate={content.contentDate}
                                    pillCategory={content.category}
                                    variant="small"
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

export default Article;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = articleContent.map(({ slug }) => ({ params: { slug } }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const article = articleContent.filter(a => a.slug === slug)[0];
    const data = {
        slug,
        content: article.body,
    };
    return { props: data };
};
