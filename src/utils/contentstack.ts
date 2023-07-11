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
        ['url'],
        true
    );

    const twitter_image = extractFieldsFromConnection(
        cs_seo.twitter_imageConnection as Connection,
        ['url'],
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

export const convertCSMarkdownToGeneralMarkdown = (cs_markdown: string) => {
    /**
     * This patches the difference between the general image markdown syntax and
     * the syntax used in Contentstack
     * This is a O(kn) operation where n is the length of cs_markdown
     * and k is the number of image references
     */

    // O(kn): retrieve all image urls
    let regex = /\[(\d+)\]:\s*(\S+)/g;
    const imageUrls: Record<string, string> = {};
    let match;

    while ((match = regex.exec(cs_markdown)) !== null) {
        const key = match[1];
        const value = match[2];
        imageUrls[key] = value;
    }

    // O(n): remove image urls at the end
    const markdownWithoutimageURL = cs_markdown.replace(regex, '');

    // O(kn): update markdown to general markdown
    let convertedMarkdown = markdownWithoutimageURL;
    regex = /!\[(.*?)\]\[(\d+)\]/;

    while ((match = regex.exec(convertedMarkdown)) !== null) {
        const description = match[1];
        const key = match[2].toString();
        const url = imageUrls[key];
        convertedMarkdown = convertedMarkdown.replace(
            regex,
            `![${description}](${url})`
        );
    }

    return convertedMarkdown;
};
