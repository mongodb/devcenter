export interface ArticleNode {
    children?: ArticleNode;
    type: string;
    name?: string;
    [k: string]: unknown;
}
