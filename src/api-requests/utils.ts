import { TagType } from '../types/tag-type';
import { CollectionType } from '../types/collection-type';

/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNode = (
    singleDataOfField: { [key: string]: any },
    fields: [string, string][] | string[]
): null | { [key: string]: any } => {
    const projectedData: { [key: string]: any } = {};

    if (singleDataOfField.edges.length === 0) {
        return null;
    }

    const data = singleDataOfField.edges[0].node;
    const sourceAndProjectFieldsAreDifferent = Array.isArray(fields[0]);

    if (sourceAndProjectFieldsAreDifferent) {
        for (const [sourceField, projectedField] of fields) {
            projectedData[projectedField] = data[sourceField];
        }

        return projectedData;
    }

    // source field and project field are the same
    for (const field of fields) {
        projectedData[field as string] = data[field as string];
    }

    return projectedData;
};

/**
 * This function will treat fields with [] and {} as non-empty, but SEO
 * after formatting only has "" and null values and thus work
 */
const isEmptySEO = (seo: { [key: string]: any }) => {
    for (const value of Object.values(seo)) {
        if (value) {
            return false;
        }
    }

    return true;
};

export const getSEO = (seoData: {
    [key: string]: any;
}): null | { [key: string]: any } => {
    let seo: { [key: string]: any } = {};

    seo = {
        ...seoData,
        og_image: extractFieldsFromNode(seoData.og_image, ['url']),
        twitter_image: extractFieldsFromNode(seoData.twitter_image, ['url']),
    };

    return !isEmptySEO(seo) ? seo : null;
};

export const insertTypename = (
    data: { [key: string]: any }[],
    __typename: TagType | CollectionType
) => {
    return data.map((d: { [key: string]: any }) => ({
        ...d,
        __typename,
    }));
};
