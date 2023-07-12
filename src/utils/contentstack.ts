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
     * This patches the difference between the general markdown syntax and
     * the markdown syntax used in Contentstack (CS).
     * This is a O(kn) operation where n is the length of cs_markdown
     * and k is the number of url references.
     * Assume that link and image reference cannot be the same.
     */

    // Note that urls can be for both images and links in CS
    // Insert image in CS: ![enter image description here][4]
    // Insert link in CS: [enter link description here][4]

    // O(n): retrieve all urls
    const urlsRegex = /\[(\d+)\]:\s*(\S+)/g;
    const urls: Record<string, string> = {};
    let match;

    while ((match = urlsRegex.exec(cs_markdown)) !== null) {
        const key = match[1];
        const value = match[2];
        urls[key] = value;
    }

    if (!Object.keys(urls).length) return cs_markdown;

    // O(n): remove image urls at the end
    const markdownWithoutURLs = cs_markdown.replace(urlsRegex, '');

    // O(kn): adopt CS image markdown
    let generalMarkdown = markdownWithoutURLs;
    const imagesRegex = /!\[(.*?)\]\[(\d+)\]/;

    while ((match = imagesRegex.exec(generalMarkdown)) !== null) {
        const description = match[1];
        const key = match[2].toString();
        const url = urls[key];
        generalMarkdown = generalMarkdown.replace(
            imagesRegex,
            `![${description}](${url})`
        );
    }

    // O(kn): adopt CS link markdown
    const linksRegex = /\[(.*?)\]\[(\d+)\]/;

    while ((match = linksRegex.exec(generalMarkdown)) !== null) {
        const description = match[1];
        const key = match[2].toString();
        const url = urls[key];
        generalMarkdown = generalMarkdown.replace(
            linksRegex,
            `[${description}](${url})`
        );
    }

    return generalMarkdown;
};
