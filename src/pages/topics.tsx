import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';

const getProductsByName = (name: string, topics: any) => {
    const L1Products = topics.filter(
        ({ category, tagName }: any) =>
            category === 'L1Product' && tagName === name
    );
    const productName = L1Products[0].tagName;
    const slug = L1Products[0].slug;
    const topicsArray = L1Products[0].topics;
    return {
        productName,
        slug,
        topicsArray,
    };
};

const ULStyles = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    columnCount: 6,
};

const Topic = ({ topics }: any) => {
    const getExpertiseLevels = topics.filter(
        ({ category }: any) => category === 'ExpertiseLevel'
    );
    const getLanguages = topics.filter(
        ({ category }: any) => category === 'ProgrammingLanguage'
    );
    const getTechnologies = topics.filter(
        ({ category }: any) => category === 'Technology'
    );

    const {
        productName: atlasProductName,
        slug: atlasSlug,
        topicsArray: atlasTopics,
    } = getProductsByName('Atlas', topics);
    const {
        productName: compassProductName,
        slug: compassSlug,
        topicsArray: compassTopics,
    } = getProductsByName('Compass', topics);
    const {
        productName: connectorsProductName,
        slug: connectorsSlug,
        topicsArray: connectorsTopics,
    } = getProductsByName('Connectors', topics);
    const {
        productName: mongoDBProductName,
        slug: mongoDBSlug,
        topicsArray: mongoDBTopics,
    } = getProductsByName('MongoDB', topics);
    const {
        productName: opsManagerProductName,
        slug: opsManagerSlug,
        topicsArray: opsManagerTopics,
    } = getProductsByName('Ops Manager', topics);
    const {
        productName: realmProductName,
        slug: realmSlug,
        topicsArray: realmTopics,
    } = getProductsByName('Realm (Mobile)', topics);

    return (
        <>
            <h1>Topics</h1>
            <h2>Expertise Level</h2>
            <ul sx={ULStyles}>
                {getExpertiseLevels.map(({ tagName, slug }: any) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Languages</h2>
            <ul sx={ULStyles}>
                {getLanguages.map(({ tagName, slug }: any) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Technologies</h2>
            <ul sx={ULStyles}>
                {getTechnologies.map(({ tagName, slug }: any) => (
                    <li key={tagName}>
                        <a href={getURLPath(slug)}>{tagName}</a>
                    </li>
                ))}
            </ul>
            <h2>Products</h2>
            <h3>
                <a href={getURLPath(atlasSlug)}>{atlasProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {atlasTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>

            <h3>
                <a href={getURLPath(compassSlug)}>{compassProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {compassTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>
            <h3>
                <a href={getURLPath(connectorsSlug)}>{connectorsProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {connectorsTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>
            <h3>
                <a href={getURLPath(mongoDBSlug)}>{mongoDBProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {mongoDBTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>
            <h3>
                <a href={getURLPath(opsManagerSlug)}>{opsManagerProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {opsManagerTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>
            <h3>
                <a href={getURLPath(realmSlug)}>{realmProductName}</a>
            </h3>
            <ul sx={ULStyles}>
                {realmTopics.map(({ title, href }: any) => (
                    <li key={title}>
                        <a href={getURLPath(href)}>{title}</a>
                    </li>
                ))}
            </ul>
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
