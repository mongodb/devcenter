import { ComponentFactory } from '../../component-factory';
import { ArticleNode } from '../../../../interfaces/article-body-node';

export const Emphasis = ({ children }: { children: ArticleNode[] }) => (
    <em>
        {children.map((child: ArticleNode, index: number) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </em>
);
