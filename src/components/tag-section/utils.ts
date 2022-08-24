import { Tag } from '../../interfaces/tag';

export type Label = 'Products' | 'Technologies' | 'Languages' | '';

interface TagsWithLabel {
    label: Label;
    tags: Tag[];
}

export const filterTags = (tags: Tag[]) =>
    tags.filter(
        tag =>
            tag &&
            tag.type &&
            tag.name &&
            tag.slug &&
            [
                'L1Product',
                'L2Product',
                'Technology',
                'ProgrammingLanguage',
            ].includes(tag.type)
    );

const mapTypeToLabel = (type: string) => {
    const mapper: { [key: string]: Label } = {
        L1Product: 'Products',
        L2Product: 'Products',
        Technology: 'Technologies',
        ProgrammingLanguage: 'Languages',
        default: '',
    };

    return mapper[type] || mapper.default;
};

export const groupTagsByType = (tags: Tag[]) => {
    const grouped = tags.reduce((acc: TagsWithLabel[], val: Tag) => {
        const label = mapTypeToLabel(val.type);
        const existingType = acc.findIndex(type => type.label === label);

        if (existingType !== -1) {
            acc[existingType] = {
                ...acc[existingType],
                tags: [...acc[existingType].tags, val],
            };
        } else {
            acc = [...acc, { label, tags: [val] }];
        }
        return acc;
    }, []);

    // return groupings based on sort order defined in requirements
    const labelOrder: Label[] = ['Languages', 'Technologies', 'Products'];
    return grouped.sort(
        (prev, next) =>
            labelOrder.indexOf(prev.label) - labelOrder.indexOf(next.label)
    );
};
