import remarkInlineLinks from 'remark-inline-links';
import { remark } from 'remark';

export const convertReferencesToInline = async (content: string) => {
    const markdownWithReferences = content || '';
    const markdownWithInLine = await remark()
        .use(remarkInlineLinks)
        .process(markdownWithReferences);
    return markdownWithInLine.toString();
};
