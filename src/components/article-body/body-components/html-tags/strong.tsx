import { ComponentFactory } from '../../component-factory';
import { ArticleNode } from '../../../../interfaces/article-body-node';

export const Strong = ({ children }: { children: ArticleNode[] }) => (
    <strong>
        {children.map((child: ArticleNode, index: number) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </strong>
);
