import React from 'react';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Heading = ({
    depth,
    children,
    id,
}: {
    depth: string;
    children: ArticleNode[];
    id: string;
}) => {
    const parentNode = {
        type: 'heading',
        depth: depth,
    };
    return (
        <div sx={{ scrollMargin: '15em' }} id={id}>
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
