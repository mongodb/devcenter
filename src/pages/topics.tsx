import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';

interface Cta {
    text: string;
    url: string;
}

interface Topic {
    title: string;
    icon: string;
    href: string;
}

interface TopicProps {
    category: string;
    tagName: string;
    description: string;
    slug: string;
    ctas: Cta[];
    topics: Topic[];
}

const getProductsByName = (arr: string[], topics: TopicProps[]) => {
    const L1Products = topics.filter(
        ({ category, tagName }) =>
            category === 'L1Product' &&
            arr.some(productName => productName === tagName)
    );
    console.log('hello', L1Products);
    return L1Products;
};

const ULStyles = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    columnCount: 6,
};

const Topic = ({ topics }: { topics: TopicProps[] }) => {
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
            <h1>Topics</h1>
            <h2>Expertise Level</h2>
            <ul sx={ULStyles}>
                {getExpertiseLevels.map(({ tagName, slug }) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Languages</h2>
            <ul sx={ULStyles}>
                {getLanguages.map(({ tagName, slug }) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Technologies</h2>
            <ul sx={ULStyles}>
                {getTechnologies.map(({ tagName, slug }) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Products</h2>
            {[Atlas, Compass, Connectors, MongoDB, OpsManager, Realm].map(
                ({ slug, tagName, topics }) => (
                    <div key={tagName}>
                        <h3>
                            <a href={getURLPath(slug)}>{tagName}</a>
                        </h3>
                        <ul sx={ULStyles}>
                            {topics?.map(({ title, href }) => (
                                <li key={title}>
                                    <a href={getURLPath(href)}>{title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
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
