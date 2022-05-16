import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';
import Hero from '../components/hero';
import { Crumb } from '../components/breadcrumbs/types';
import { GridLayout, TypographyScale } from '@mdb/flora';

interface Cta {
    text: string;
    url: string;
}

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
    ctas: Cta[];
    topics: Topic[];
}

const getProductsByName = (productsArray: string[], topics: TopicsProps[]) => {
    const L1Products = topics.filter(
        ({ category, tagName }) =>
            category === 'L1Product' &&
            productsArray.some(productName => productName === tagName)
    );
    return L1Products;
};

const ULStyles = {
    listStyleType: 'none',
    padding: 0,
    marginBottom: ['section20', 'section20', 'section20', 'section40'],
    display: 'grid',
    gridTemplateColumns: [
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
        'repeat(4, 1fr)',
        'repeat(4, 1fr)',
        'repeat(6, 1fr)',
    ],
    li: {
        // paddingBottom: ['inc30', 'inc30', 'inc30', 'inc40'],
        'a:hover': {
            textDecoration: 'underline !important',
        },
    },
};

const Topic = ({ topics }: { topics: TopicsProps[] }) => {
    const crumbs: Crumb[] = [
        { text: 'MongoDB Developer Center', url: '/developer' },
        { text: 'Developer Topics', url: '/developer/topics' },
    ];

    const getExpertiseLevels = topics.filter(
        ({ category }) => category === 'ExpertiseLevel'
    );
    const getLanguages = topics?.filter(
        ({ category }) => category === 'ProgrammingLanguage'
    );
    const getTechnologies = topics?.filter(
        ({ category }) => category === 'Technology'
    );

    const L1productsArray = [
        'Atlas',
        'Compass',
        'Connectors',
        'MongoDB',
        'Ops Manager',
        'Realm (Mobile)',
    ];

    const [Atlas, Compass, Connectors, MongoDB, OpsManager, Realm] =
        getProductsByName(L1productsArray, topics);

    return (
        <>
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
                    {[
                        Atlas,
                        Compass,
                        Connectors,
                        MongoDB,
                        OpsManager,
                        Realm,
                    ].map(({ slug, tagName, topics }) => (
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
                                    {topics?.map(({ title, href }) => (
                                        <li key={title}>
                                            <TypographyScale variant="body1">
                                                <a href={getURLPath(href)}>
                                                    {title}
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
    const client = clientFactory('ApolloREST', process.env.STRAPI_URL);
    const metaInfo = await getAllMetaInfo();
    return {
        props: { topics: metaInfo },
    };
};
