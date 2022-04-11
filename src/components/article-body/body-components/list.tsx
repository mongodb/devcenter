import { ComponentFactory } from '../component-factory';
import React from 'react';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const List = ({
    children,
    ordered,
    ...rest
}: {
    children: ArticleNode[];
    ordered: boolean;
}) => {
    return !ordered ? (
        <ul>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </ul>
    ) : (
        <ol>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </ol>
    );
};
