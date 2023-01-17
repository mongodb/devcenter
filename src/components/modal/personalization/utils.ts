import metaInfoPreval from '../../../service/get-all-meta-info.preval';
import { PersonlizationTagType } from './types';

type configType = {
    title: string;
    tags: Array<PersonlizationTagType>;
};

// DEV Note: See comments in personalization-paginated.modal.tsx about need for "skipIndex" usage
export function initializePersonalizationConfig(useSkipIndex = false) {
    const skipIndex: configType = { title: 'Default', tags: [] };
    const languages: configType = { title: 'Languages', tags: [] };
    const technologies: configType = { title: 'Technologies', tags: [] };
    const products: configType = { title: 'Products', tags: [] };

    metaInfoPreval.forEach(({ category, tagName, slug }) => {
        if (category === 'ProgrammingLanguage') {
            languages.tags.push({ category, tagName, slug });
        } else if (category === 'L1Product' || category === 'L2Product') {
            products.tags.push({ category, tagName, slug });
        } else if (category === 'Technology') {
            technologies.tags.push({ category, tagName, slug });
        }
    });

    return useSkipIndex
        ? [skipIndex, languages, technologies, products]
        : [languages, technologies, products];
}

export function submitPersonalizationSelections() {
    // do the http req here
}
