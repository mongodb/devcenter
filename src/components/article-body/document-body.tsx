import { ComponentFactory } from './component-factory';
import { ArticleNode } from '../../interfaces/article-body-node';

export const DocumentBody = ({ content }: any) => {
    return [content].map((child: ArticleNode, index) => (
        <ComponentFactory key={index} nodeData={child} />
    ));
};
