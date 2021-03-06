export const getTableOfContents = (
    nodes: any,
    key: string,
    value: string,
    maxDepth: number,
    minDepth: number = 1,
    minHeadingSize: number = 2
) => {
    const results: any = [];
    const searchNode = (node: any, sectionDepth: number) => {
        if (
            node[key] === value &&
            sectionDepth - 1 <= maxDepth &&
            sectionDepth > minDepth
        ) {
            const nodeTitle = node.children;
            const newNode = {
                children: [],
                depth: sectionDepth,
                id: node.id,
                title: nodeTitle,
            };
            const lastElement = results[results.length - 1];
            if (!lastElement || sectionDepth <= lastElement.depth) {
                // Strapi includes a field called `depth` for a heading
                // i.e. depth = 2 --> H2, etc.
                // For TOC we only want H2 and above by default
                if (!node.depth || node.depth <= minHeadingSize) {
                    results.push(newNode);
                }
            } else {
                lastElement.children.push(newNode);
            }
        }
        // Don't include step headings in our TOC regardless of depth
        if (node.children && node.name !== 'step') {
            if (node.type === 'section') {
                sectionDepth += 1; // eslint-disable-line no-param-reassign
            }
            return node.children.forEach((child: any) =>
                searchNode(child, sectionDepth)
            );
        }
        return null;
    };

    nodes.forEach((node: any) => searchNode(node, 0));
    return results;
};
