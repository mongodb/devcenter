import { ComponentFactory } from '../component-factory';
import React from 'react';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Paragraph = ({ children, ...rest }: { children: any }) => {
    return (
        <>
            {children.map((child: ArticleNode, index: number) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </>
    );
};
