import { UnderlyingClient } from '../types/client-factory';
import { DocumentNode } from 'graphql';
import { CSEdges } from '../interfaces/contentstack';

type gqlParents =
    | 'l1Products'
    | 'l2Products'
    | 'programmingLanguages'
    | 'technologies'
    | 'expertiseLevels'
    | 'contentTypes';

export const fetchAll = async (
    client: UnderlyingClient<'ApolloGraphQL'>,
    query: DocumentNode,
    gqlParentName: gqlParents
) => {
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

    return allItems;
};

/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromNode = (
    singleDataOfField: CSEdges<any>,
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
