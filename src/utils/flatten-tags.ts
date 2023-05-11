import { Tag } from '../interfaces/tag';
import { OtherTags } from '../interfaces/other-tags';
import { CS_OtherTags } from '../interfaces/other-tags';

// STRAPI

const parseOtherTags = (otherTags: OtherTags) => {
    const tags: Tag[] = [];
    if (!otherTags) return tags;

    const contentType = otherTags.contentType;
    const technology = otherTags.technology;
    const authorType = otherTags.authorType;
    const l1Product = otherTags.l1Product;
    const l2Product = otherTags.l2Product;
    const spokenLanguage = otherTags.spokenLanguage;
    const expertiseLevel = otherTags.expertiseLevel;
    const programmingLanguage = otherTags.programmingLanguage;
    if (contentType) {
        tags.push({
            name: contentType.contentType,
            slug: contentType.calculatedSlug,
            type: 'ContentType',
        });
    }
    if (technology) {
        technology.forEach(entry => {
            tags.push({
                name: entry.name,
                slug: entry.calculatedSlug,
                type: 'Technology',
            });
        });
    }
    if (authorType) {
        tags.push({
            name: authorType.name,
            slug: authorType.calculatedSlug,
            type: 'AuthorType',
        });
    }
    if (l1Product) {
        tags.push({
            name: l1Product.name,
            slug: l1Product.calculatedSlug,
            type: 'L1Product',
        });
    }
    if (l2Product) {
        tags.push({
            name: l2Product.name,
            slug: l2Product.calculatedSlug,
            type: 'L2Product',
        });
    }
    if (spokenLanguage) {
        tags.push({
            name: spokenLanguage.name,
            slug: spokenLanguage.calculatedSlug,
            type: 'SpokenLanguage',
        });
    }
    if (expertiseLevel) {
        tags.push({
            name: expertiseLevel.name,
            slug: expertiseLevel.calculatedSlug,
            type: 'ExpertiseLevel',
        });
    }
    if (programmingLanguage) {
        programmingLanguage.forEach(entry => {
            tags.push({
                name: entry.name,
                slug: entry.calculatedSlug,
                type: 'ProgrammingLanguage',
            });
        });
    }

    return tags;
};

// CONTENTSTACK

const CS_parseOtherTags = (otherTags: CS_OtherTags) => {
    const tags: Tag[] = [];
    if (!otherTags) return tags;

    const contentType = otherTags.content_typeConnection?.edges[0];
    const technology = otherTags.technologiesConnection?.edges;
    const authorType = otherTags.author_typeConnection?.edges[0];
    const l1Product = otherTags.l1_productConnection?.edges[0];
    const l2Product = otherTags.l2_productConnection?.edges[0];
    const spokenLanguage = otherTags.spoken_languageConnection?.edges[0];
    const expertiseLevel = otherTags.expertise_levelConnection?.edges[0];
    const programmingLanguage =
        otherTags.programming_languagesConnection?.edges;
    if (contentType) {
        tags.push({
            name: contentType.node.title,
            slug: contentType.node.calculated_slug,
            type: 'ContentType',
        });
    }
    if (technology) {
        technology.forEach(entry => {
            tags.push({
                name: entry.node.title,
                slug: entry.node.calculated_slug,
                type: 'Technology',
            });
        });
    }
    if (authorType) {
        tags.push({
            name: authorType.node.title,
            slug: authorType.node.calculated_slug,
            type: 'AuthorType',
        });
    }
    if (l1Product) {
        tags.push({
            name: l1Product.node.title,
            slug: l1Product.node.calculated_slug,
            type: 'L1Product',
        });
    }
    if (l2Product) {
        tags.push({
            name: l2Product.node.title,
            slug: l2Product.node.calculated_slug,
            type: 'L2Product',
        });
    }
    if (spokenLanguage) {
        tags.push({
            name: spokenLanguage.node.title,
            slug: spokenLanguage.node.calculated_slug,
            type: 'SpokenLanguage',
        });
    }
    if (expertiseLevel) {
        tags.push({
            name: expertiseLevel.node.title,
            slug: expertiseLevel.node.calculated_slug,
            type: 'ExpertiseLevel',
        });
    }
    if (programmingLanguage) {
        programmingLanguage.forEach(entry => {
            tags.push({
                name: entry.node.title,
                slug: entry.node.calculated_slug,
                type: 'ProgrammingLanguage',
            });
        });
    }

    return tags;
};

const removeDuplicates = (inArray: Tag[]) => {
    const arr = inArray.concat(); // create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for (let i = 0; i < arr.length; ++i) {
        //create the second cycle of the loop from element n+1
        for (let j = i + 1; j < arr.length; ++j) {
            //if the two elements are equal , then they are duplicate
            if (arr[i].name === arr[j].name && arr[i].type === arr[j].type) {
                arr.splice(j, 1); //remove the duplicated element
            }
        }
    }
    return arr;
};

export const flattenTags = (otherTags: OtherTags | OtherTags[]): Tag[] => {
    if (!otherTags) {
        return [];
    }

    const flattenedTags = parseOtherTags(
        Array.isArray(otherTags) ? otherTags[0] : otherTags
    );
    return removeDuplicates(flattenedTags);
};

export const CS_flattenTags = (
    otherTags: CS_OtherTags | CS_OtherTags[] | null
): Tag[] => {
    if (!otherTags) {
        return [];
    }

    const flattenedTags = CS_parseOtherTags(
        Array.isArray(otherTags) ? otherTags[0] : otherTags
    );
    return removeDuplicates(flattenedTags);
};
