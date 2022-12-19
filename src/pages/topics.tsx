import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import { TypographyScale } from '@mdb/flora';
import { h5Styles, h6Styles, pageWrapper } from '../styled/layout';

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
    margin: 0,
    display: 'grid',
    rowGap: ['inc30', 'inc30', 'inc30', 'inc40'],
    columnGap: 'inc30',
    gridTemplateColumns: [
        'repeat(2, 1fr)',
        null,
        'repeat(4, 1fr)',
        null,
        'repeat(6, 1fr)',
    ],
    li: {
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
            <div sx={pageWrapper}>
                <div
                    sx={{
                        maxWidth: '1416px', // Same as Flora's grid.
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: ['section20', null, null, 'section50'],
                    }}
                >
                    <div>
                        <TypographyScale
                            sx={{
                                ...h5Styles,
                                marginBottom: ['inc30', null, null, 'inc50'],
                            }}
                            variant="heading2"
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
                    </div>
                    <div>
                        <TypographyScale
                            sx={{
                                ...h5Styles,
                                marginBottom: ['inc30', null, null, 'inc50'],
                            }}
                            variant="heading2"
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
                    </div>
                    <div>
                        <TypographyScale
                            sx={{
                                ...h5Styles,
                                marginBottom: ['inc30', null, null, 'inc50'],
                            }}
                            variant="heading2"
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
                    </div>
                    <div>
                        <TypographyScale
                            sx={{
                                ...h5Styles,
                                marginBottom: ['inc30', null, null, 'inc50'],
                            }}
                            variant="heading2"
                        >
                            Products
                        </TypographyScale>
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: ['inc70', null, null, 'inc90'],
                            }}
                        >
                            {products.map(({ slug, tagName, topics }) => (
                                <div key={tagName}>
                                    <TypographyScale
                                        sx={{
                                            ...h6Styles,
                                            fontWeight: '700',
                                            marginBottom: [
                                                'inc20',
                                                null,
                                                null,
                                                'inc30',
                                            ],
                                            'a:hover': {
                                                textDecoration:
                                                    'underline !important',
                                            },
                                        }}
                                        variant="heading3"
                                    >
                                        <a href={getURLPath(slug)}>{tagName}</a>
                                    </TypographyScale>
                                    {!!topics.length && (
                                        <ul sx={ULStyles}>
                                            {topics.map(({ tagName, slug }) => (
                                                <li key={tagName}>
                                                    <TypographyScale variant="body1">
                                                        <a
                                                            href={getURLPath(
                                                                slug
                                                            )}
                                                        >
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Topic;

export const getStaticProps: GetStaticProps = async () => {
    const metaInfo = await getAllMetaInfo();
    return {
        props: { topics: metaInfo },
    };
};
