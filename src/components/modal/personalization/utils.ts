import { Tag } from '../../../interfaces/tag';
import { MetaInfo } from '../../../interfaces/meta-info';
import { PersonalizationModalConfig } from './types';
import { getURLPath } from '../../../utils/format-url-path';

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

export async function submitPersonalizationSelections(
    {
        followedTags,
        emailPreference,
    }: {
        followedTags: Array<Tag>;
        emailPreference: boolean;
    },
    userId: unknown
) {
    const req = await fetch(
        getURLPath(`/api/userPreferences?userId=${userId}`, false) as string,
        {
            method: 'PUT',
            body: JSON.stringify({ followedTags, emailPreference }),
        }
    );

    const res = await req.json();
    return res; // there's no current plan to display success/failure to user
}
