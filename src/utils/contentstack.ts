import { Connection } from '../interfaces/connection';
import { CS_SEO, SEO } from '../interfaces/seo';
import { SEOImage } from '../interfaces/seo';

/**
 * Helper to access the desired fields through edges and node
 * @param fields [sourceField, projectedField][] if they are different
 * or field[] if both sourceField and projectField are the same
 */
export const extractFieldsFromConnection = (
    connection: Connection,
    fields: [string, string][] | string[],
    onlyFirstOne: boolean
) => {
    if (!connection || connection.edges.length === 0) {
        return onlyFirstOne ? null : [];
    }

    const projDataList: { [key: string]: any }[] = [];

    for (const { node } of connection.edges) {
        const projData: { [key: string]: any } = {};
        const srcAndProjFieldsAreDifferent = Array.isArray(fields[0]);

        for (const field of fields) {
            const srcField = (
                srcAndProjFieldsAreDifferent ? field[0] : field
            ) as string;
            const projField = (
                srcAndProjFieldsAreDifferent ? field[1] : field
            ) as string;

            if (srcField in node) {
                projData[projField] = node[srcField];
            }
        }

        if (Object.keys(projData).length > 0) {
            projDataList.push(projData);
        }
    }

    if (projDataList.length > 0) {
        return onlyFirstOne ? projDataList[0] : projDataList;
    }

    return onlyFirstOne ? null : [];
};

export const mapSEO = (cs_seo: CS_SEO): SEO | null => {
    const og_image = extractFieldsFromConnection(
        cs_seo.og_imageConnection as Connection,
        ['url', 'description'],
        true
    );

    const twitter_image = extractFieldsFromConnection(
        cs_seo.twitter_imageConnection as Connection,
        ['url', 'description'],
        true
    );

    const seo = {
        canonical_url: cs_seo.canonical_url ?? '',
        meta_description: cs_seo.meta_description ?? '',
        og_description: cs_seo.og_description ?? '',
        og_image: (og_image as SEOImage) ?? null,
        og_type: cs_seo.og_type ?? '',
        og_url: cs_seo.og_url ?? '',
        twitter_card: (cs_seo.twitter_card as string) ?? '',
        twitter_creator: cs_seo.twitter_creator ?? '',
        twitter_description: cs_seo.twitter_description ?? '',
        twitter_image: (twitter_image as SEOImage) ?? null,
    };

    return isEmptySEO(seo) ? null : seo;
};

const isEmptySEO = (seo: { [key: string]: any }) => {
    for (const value of Object.values(seo)) {
        if (value) {
            return false;
        }
    }

    return true;
};
