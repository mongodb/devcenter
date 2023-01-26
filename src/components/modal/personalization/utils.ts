import { MetaInfo } from '../../../interfaces/meta-info';
import { PersonalizationModalConfig } from './types';

export function initializePersonalizationConfig(metaInfo: MetaInfo[]) {
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

    metaInfo.forEach(({ category, tagName, slug }) => {
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

// TODO: you will also need to pass userId here to construct the path for the PUT
// eslint-disable-next-line
export function submitPersonalizationSelections(body: any) {
    // do the http req here
}
