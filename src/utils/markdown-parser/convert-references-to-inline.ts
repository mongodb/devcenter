export const convertReferencesToInline = async (content: string) => {
    const markdownWithReferences = content || '';
    //const markdownWithInLine = await remark().use(remarkInlineLinks).process(markdownWithReferences)
    //return markdownWithInLine.toString()
    return markdownWithReferences;
};
