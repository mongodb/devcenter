import { Tag } from '../interfaces/tag';
import { CS_OtherTags, CS_PreviewOtherTags } from '../interfaces/other-tags';
import {
    CS_ArticlePrimaryTag,
    CS_PreviewPrimaryTag,
} from '../interfaces/article';

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

export const CS_flattenPrimaryTags = (
    primary_tag: CS_ArticlePrimaryTag
): Tag[] => {
    if (!primary_tag) {
        return [];
    }

    function CS_ParsePrimaryTag(primaryTag: CS_ArticlePrimaryTag) {
        const tags: Tag[] = [];
        const edges = primaryTag.tagConnection.edges;
        if (edges && edges.length > 0) {
            tags.push({
                name: edges[0].node.title,
                slug: edges[0].node.calculated_slug,
                type: edges[0].node.calculated_slug.startsWith('/products')
                    ? 'L1Product'
                    : 'ProgrammingLanguage',
            });
        }
        return tags;
    }

    const flattenedTags = CS_ParsePrimaryTag(primary_tag);
    return removeDuplicates(flattenedTags);
};

export const CS_mergeTags = (primary_tags: Tag[], other_tags: Tag[]): Tag[] => {
    return removeDuplicates(primary_tags.concat(other_tags));
};

// PREVIEW

const CS_previewParseOtherTags = (otherTags: CS_PreviewOtherTags) => {
    const tags: Tag[] = [];
    if (!otherTags) return tags;

    const contentType = otherTags.content_type?.at(0);
    const technology = otherTags.technologies;
    const authorType = otherTags.author_type?.at(0);
    const l1Product = otherTags.l1_product?.at(0);
    const l2Product = otherTags.l2_product?.at(0);
    const spokenLanguage = otherTags.spoken_language?.at(0);
    const expertiseLevel = otherTags.expertise_level?.at(0);
    const programmingLanguage = otherTags.programming_languages;
    if (contentType) {
        tags.push({
            name: contentType.title,
            slug: contentType.calculated_slug,
            type: 'ContentType',
        });
    }
    if (technology) {
        technology.forEach(entry => {
            tags.push({
                name: entry.title,
                slug: entry.calculated_slug,
                type: 'Technology',
            });
        });
    }
    if (authorType) {
        tags.push({
            name: authorType.title,
            slug: authorType.calculated_slug,
            type: 'AuthorType',
        });
    }
    if (l1Product) {
        tags.push({
            name: l1Product.title,
            slug: l1Product.calculated_slug,
            type: 'L1Product',
        });
    }
    if (l2Product) {
        tags.push({
            name: l2Product.title,
            slug: l2Product.calculated_slug,
            type: 'L2Product',
        });
    }
    if (spokenLanguage) {
        tags.push({
            name: spokenLanguage.title,
            slug: spokenLanguage.calculated_slug,
            type: 'SpokenLanguage',
        });
    }
    if (expertiseLevel) {
        tags.push({
            name: expertiseLevel.title,
            slug: expertiseLevel.calculated_slug,
            type: 'ExpertiseLevel',
        });
    }
    if (programmingLanguage) {
        programmingLanguage.forEach(entry => {
            tags.push({
                name: entry.title,
                slug: entry.calculated_slug,
                type: 'ProgrammingLanguage',
            });
        });
    }

    return tags;
};

export const CS_previewFlattenTags = (
    otherTags: CS_PreviewOtherTags | CS_PreviewOtherTags[] | null
): Tag[] => {
    if (!otherTags) {
        return [];
    }

    const flattenedTags = CS_previewParseOtherTags(
        Array.isArray(otherTags) ? otherTags[0] : otherTags
    );
    return removeDuplicates(flattenedTags);
};

export const CS_previewFlattenPrimaryTags = (
    primary_tag: CS_PreviewPrimaryTag[]
): Tag[] => {
    if (!primary_tag) {
        return [];
    }

    function CS_previewParsePrimaryTag(primaryTag: CS_PreviewPrimaryTag[]) {
        const tags: Tag[] = [];
        if (primaryTag && primaryTag.length > 0) {
            tags.push({
                name: primaryTag[0].title,
                slug: primaryTag[0].calculated_slug,
                type: primaryTag[0].calculated_slug.startsWith('/products')
                    ? 'L1Product'
                    : 'ProgrammingLanguage',
            });
        }
        return tags;
    }

    const flattenedTags = CS_previewParsePrimaryTag(primary_tag);
    return removeDuplicates(flattenedTags);
};
