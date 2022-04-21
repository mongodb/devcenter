import { Tags } from '../interfaces/content-piece';

export const flattenTags = ({
    l1Product,
    l2Product,
    programmingLanguage,
    technology,
    authorType,
    contentType,
}: Tags) => {
    const flattenedTags = l2Product
        .concat(programmingLanguage)
        .concat(technology);

    flattenedTags.push(authorType);
    flattenedTags.push(contentType);

    if (l1Product) {
        flattenedTags.push(l1Product);
    }
    return flattenedTags;
};
