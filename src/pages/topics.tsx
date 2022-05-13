import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';

const Topic = ({ topics }: any) => {
    const ULStyles = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        columnCount: 6,
    };

    const getExpertiseLevels = topics.filter(
        ({ category }: any) => category === 'ExpertiseLevel'
    );
    const getLanguages = topics.filter(
        ({ category }: any) => category === 'ProgrammingLanguage'
    );
    const getTechnologies = topics.filter(
        ({ category }: any) => category === 'Technology'
    );

    const getProductsByName = (name: string) => {
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
                <a href={getProductsByName('Atlas').slug}>
                    {getProductsByName('Atlas').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('Atlas').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
            </ul>

            <h3>
                <a href={getProductsByName('Compass').slug}>
                    {getProductsByName('Compass').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('Compass').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
            </ul>
            <h3>
                <a href={getProductsByName('Connectors').slug}>
                    {getProductsByName('Connectors').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('Connectors').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
            </ul>
            <h3>
                <a href={getProductsByName('MongoDB').slug}>
                    {getProductsByName('MongoDB').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('MongoDB').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
            </ul>
            <h3>
                <a href={getProductsByName('Ops Manager').slug}>
                    {getProductsByName('Ops Manager').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('Ops Manager').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
            </ul>
            <h3>
                <a href={getProductsByName('Realm (Mobile)').slug}>
                    {getProductsByName('Realm (Mobile)').productName}
                </a>
            </h3>
            <ul sx={ULStyles}>
                {getProductsByName('Realm (Mobile)').topicsArray.map(
                    ({ title, href }: any) => (
                        <li key={title}>
                            <a href={getURLPath(href)}>{title}</a>
                        </li>
                    )
                )}
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
