import React from 'react';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Heading = ({
    depth,
    children,
    id,
    ...rest
}: {
    depth: string;
    children: any;
    id: string;
}) => {
    const parentNode = {
        type: 'heading',
        depth: depth,
    };
    return (
        <div id={id}>
            <a href={`#${id}`} />
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory
                    nodeData={child}
                    key={index}
                    parentNode={parentNode}
                />
            ))}
        </div>
    );
};
