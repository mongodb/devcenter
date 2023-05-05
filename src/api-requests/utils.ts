import { TagType } from '../types/tag-type';
import { CollectionType } from '../types/collection-type';
import { UnderlyingClient } from '../types/client-factory';
import { DocumentNode } from 'graphql';
import { isStrapiClient } from '../utils/client-factory';

/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNode = (
    singleDataOfField: { [key: string]: any } | null,
    fields: [string, string][] | string[]
): null | { [key: string]: any } => {
    if (!singleDataOfField) {
        return null;
    }

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
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNodes = (
    singleDataOfField: { [key: string]: any | null },
    fields: [string, string][] | string[]
): { [key: string]: any }[] => {
    if (!singleDataOfField) {
        return [];
    }

    const projectedDataList: { [key: string]: any }[] = [];

    if (singleDataOfField.edges.length === 0) {
        return [];
    }

    for (const { node } of singleDataOfField.edges) {
        const projectedData: { [key: string]: any } = {};
        const sourceAndProjectFieldsAreDifferent = Array.isArray(fields[0]);
        if (sourceAndProjectFieldsAreDifferent) {
            for (const [sourceField, projectedField] of fields) {
                projectedData[projectedField] = node[sourceField];
            }
        } else {
            // source field and project field are the same
            for (const field of fields) {
                projectedData[field as string] = node[field as string];
            }
        }

        projectedDataList.push(projectedData);
    }

    return projectedDataList;
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

    delete seo.__typename;

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

export const fetchAll = async (
    client: UnderlyingClient<'ApolloREST'> | UnderlyingClient<'ApolloGraphQL'>,
    query: DocumentNode,
    gqlParentName: string
) => {
    if (isStrapiClient(client)) {
        return client.query({ query });
    }

    // expect all incoming cs_query already has total
    const response: any = await client.query({ query });
    const { total } = response.data[gqlParentName];

    let allItems: { [key: string]: any }[] = [];

    while (allItems.length < total) {
        const variables = { skip: allItems.length };
        const res: any = await client.query({ query, variables });
        const { items } = res.data[gqlParentName];

        allItems = allItems.concat(items);
    }

    const allData: { [key: string]: any } = { data: {} };
    allData.data[gqlParentName] = {
        total,
        items: allItems,
    };

    return allData;
};

export const areTheSame = (
    list1: { [key: string]: any }[],
    list2: { [key: string]: any }[],
    comparatorFunc: (
        a: { [key: string]: any },
        b: { [key: string]: any }
    ) => number,
    isEqualFunc: (
        a: { [key: string]: any },
        b: { [key: string]: any }
    ) => boolean
): boolean => {
    if (list1.length !== list2.length) {
        return false;
    }

    list1.sort(comparatorFunc);
    list2.sort(comparatorFunc);

    for (let idx = 0; idx < list1.length; idx++) {
        if (!isEqualFunc(list1[idx], list2[idx])) {
            return false;
        }
    }

    return true;
};
