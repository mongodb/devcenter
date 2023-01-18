import metaInfoPreval from '../../../service/get-all-meta-info.preval';
import { PersonalizationModalConfig } from './types';

export function initializePersonalizationConfig() {
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

    metaInfoPreval.forEach(({ category, tagName, slug }) => {
        if (category === 'ProgrammingLanguage') {
            languages.tags.push({ category, tagName, slug });
        } else if (category === 'L1Product' || category === 'L2Product') {
            products.tags.push({ category, tagName, slug });
        } else if (category === 'Technology') {
            technologies.tags.push({ category, tagName, slug });
        }
    });

    return [languages, technologies, products];
}

// TODO: you will also need to pass userId here to construct the path for the PUT/POST
// eslint-disable-next-line
export function submitPersonalizationSelections(selections: any) {
    // do the http req here
}
