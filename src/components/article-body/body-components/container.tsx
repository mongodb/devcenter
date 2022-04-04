import React from 'react';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Container = ({
    argument,
    children,
    ...rest
}: {
    argument: any;
    children: any;
}) => {
    return (
        <div>
            {children.map((element: ArticleNode, index: number) => (
                <ComponentFactory {...rest} nodeData={element} key={index} />
            ))}
        </div>
    );
};
