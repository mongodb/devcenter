import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { clientFactory } from '../utils/client-factory';
import {
    getAllArticlesFromAPI,
    getArticles,
} from '../api-requests/get-articles';
import { getAllMetaInfo } from '../service/get-all-meta-info';
import { getURLPath } from '../utils/format-url-path';


const Topic = ({ topics } :any) => {
    const getExpertiseLevels = topics.filter(({category}:any) => category === 'ExpertiseLevel');
    const getLanguages = topics.filter(({category}:any) => category === 'ProgrammingLanguage');
    const getTechnologies = topics.filter(({category}:any) => category === 'Technology');
    const getProducts = topics.filter(({category}:any) => category === 'L1Product');

    return (
    <>
        <h1>MongoDB Developer Center</h1>
        <h2>Expertise Level</h2>
        <ul>
            {getExpertiseLevels.map(({tagName, slug}:any) => (
                <li key={tagName}><a href={getURLPath(slug)}>{tagName}</a></li>
            ))}
        </ul>
        <h2>Expertise Level</h2>
        <ul>
            {getLanguages.map(({tagName, slug}:any) => (
                <li key={tagName}><a href={getURLPath(slug)}>{tagName}</a></li>
            ))}
        </ul>
        <h2>Expertise Level</h2>
        <ul>
            {getTechnologies.map(({tagName, slug}:any) => (
                <li key={tagName}><a href={getURLPath(slug)}>{tagName}</a></li>
            ))}
        </ul>
        <h2>Expertise Level</h2>
        <ul>
            {getProducts.map(({tagName, slug}:any) => (
                <li key={tagName}><a href={getURLPath(slug)}>{tagName}</a></li>
            ))}
        </ul>
    </>
)};

export default Topic;

export const getStaticProps: GetStaticProps = async ({}) => {
    const client = clientFactory('ApolloREST', process.env.STRAPI_URL);
    const metaInfo = await getAllMetaInfo();
    console.log(JSON.stringify(metaInfo));
    return {
        props: { topics: metaInfo },
    };
};
