import preval from 'next-plugin-preval';
import { getAllMetaInfo } from './get-all-meta-info';
import { PersonalizationModalConfig } from '../components/modal/personalization/types';

async function getData() {
    const allMetaInfo = await getAllMetaInfo();

    const languages: PersonalizationModalConfig = {
        title: 'Languages',
        tags: [],
    };
    const technologies: PersonalizationModalConfig = {
        title: 'Technologies',
        tags: [],
    };
    const products: PersonalizationModalConfig = {
        title: 'Products',
        tags: [],
    };

    allMetaInfo.forEach(({ category, tagName, slug }) => {
        if (category === 'ProgrammingLanguage') {
            languages.tags.push({ type: category, name: tagName, slug });
        } else if (category === 'L1Product' || category === 'L2Product') {
            products.tags.push({ type: category, name: tagName, slug });
        } else if (category === 'Technology') {
            technologies.tags.push({ type: category, name: tagName, slug });
        }
    });

    return [languages, technologies, products];
}

export default preval(getData());
