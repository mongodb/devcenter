import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import { GridLayout, TypographyScale } from '@mdb/flora';

interface Topic {
    title: string;
    icon: string;
    href: string;
}

interface TopicsProps {
    category: string;
    tagName: string;
    description: string;
    slug: string;
    topics: TopicsProps[];
}

const ULStyles = {
    listStyleType: 'none',
    padding: 0,
    marginBottom: ['section20', 'section20', 'section20', 'section40'],
    display: 'grid',
    columnGap: 'inc70',
    gridTemplateColumns: [
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
        'repeat(4, 1fr)',
        'repeat(4, 1fr)',
        'repeat(6, 1fr)',
    ],
    li: {
        paddingBottom: ['inc30', 'inc30', 'inc30', 'inc40'],
        'a:hover': {
            textDecoration: 'underline !important',
        },
    },
};

const Topic = ({ topics }: { topics: TopicsProps[] }) => {
    const crumbs: Crumb[] = [{ text: 'MongoDB Developer Center', url: '/' }];

    const getExpertiseLevels = topics.filter(
        ({ category }) => category === 'ExpertiseLevel'
    );
    const getLanguages = topics?.filter(
        ({ category }) => category === 'ProgrammingLanguage'
    );
    const getTechnologies = topics?.filter(
        ({ category }) => category === 'Technology'
    );

    const l1Products = topics.filter(tag => tag.category === 'L1Product');
    const l2Products = topics.filter(tag => tag.category === 'L2Product');

    const products: TopicsProps[] = l1Products.map(prod => ({
        ...prod,
        topics: [],
    }));
    l2Products.forEach(l2 => {
        const existingL1 = products.find(l1 => l2.slug.startsWith(l1.slug));
        if (existingL1) {
            if (
                !existingL1.topics.find(
                    existingL2 => existingL2.slug === l2.slug
                )
            ) {
                existingL1.topics.push(l2);
            }
        } else {
            throw Error('Did not find corresponding l1 for ' + l2.tagName);
        }
    });

    return (
        <>
            <NextSeo title={'All Topics | MongoDB'} />
            <Hero crumbs={crumbs} name="All Topics" />
            <GridLayout
                sx={{
                    paddingLeft: [
                        'inc40',
                        'inc40',
                        'inc50',
                        'inc70',
                        'inc70',
                        0,
                    ],
                    paddingRight: [
                        'inc40',
                        'inc40',
                        'inc50',
                        'inc70',
                        'inc70',
                        0,
                    ],
                }}
            >
                <div
                    sx={{
                        gridColumn: ['span 6', 'span 8', 'span 12', 'span 12'],
                        marginTop: ['inc40', 'inc40', 'inc40', 'inc50'],
                    }}
                >
                    <TypographyScale
                        sx={{
                            marginBottom: ['inc30', 'inc30', 'inc30', 'inc50'],
                        }}
                        variant="heading5"
                    >
                        Expertise Level
                    </TypographyScale>
                    <ul sx={ULStyles}>
                        {getExpertiseLevels?.map(({ tagName, slug }) => (
                            <li key={tagName}>
                                <TypographyScale variant="body1">
                                    <a href={getURLPath(slug)}>{tagName}</a>
                                </TypographyScale>
                            </li>
                        ))}
                    </ul>
                    <TypographyScale
                        sx={{
                            marginBottom: ['inc30', 'inc30', 'inc30', 'inc50'],
                        }}
                        variant="heading5"
                    >
                        Languages
                    </TypographyScale>
                    <ul sx={ULStyles}>
                        {getLanguages?.map(({ tagName, slug }) => (
                            <li key={tagName}>
                                <TypographyScale variant="body1">
                                    <a href={getURLPath(slug)}>{tagName}</a>
                                </TypographyScale>
                            </li>
                        ))}
                    </ul>
                    <TypographyScale
                        sx={{
                            marginBottom: ['inc30', 'inc30', 'inc30', 'inc50'],
                        }}
                        variant="heading5"
                    >
                        Technologies
                    </TypographyScale>
                    <ul sx={ULStyles}>
                        {getTechnologies?.map(({ tagName, slug }) => (
                            <li key={tagName}>
                                <TypographyScale variant="body1">
                                    <a href={getURLPath(slug)}>{tagName}</a>
                                </TypographyScale>
                            </li>
                        ))}
                    </ul>
                    <TypographyScale
                        sx={{ marginBottom: 0 }}
                        variant="heading5"
                    >
                        Products
                    </TypographyScale>
                    {products.map(({ slug, tagName, topics }) => (
                        <div key={tagName}>
                            <TypographyScale
                                sx={{
                                    fontWeight: '700',
                                    marginTop: 'inc50',
                                    marginBottom: [
                                        'inc30',
                                        'inc30',
                                        'inc30',
                                        'inc30',
                                    ],
                                }}
                                variant="heading6"
                            >
                                <a href={getURLPath(slug)}>{tagName}</a>
                            </TypographyScale>
                            {!!topics.length && (
                                <ul sx={{ ...ULStyles, marginBottom: 'inc90' }}>
                                    {topics.map(({ tagName, slug }) => (
                                        <li key={tagName}>
                                            <TypographyScale variant="body1">
                                                <a href={getURLPath(slug)}>
                                                    {tagName}
                                                </a>
                                            </TypographyScale>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </GridLayout>
        </>
    );
};

export default Topic;

export const getStaticProps: GetStaticProps = async ({}) => {
    const metaInfo = await getAllMetaInfo();
    return {
        props: { topics: metaInfo },
    };
};
