import React from 'react';
import { ComponentFactory } from '../component-factory';
import { VerticalSectionSpacing } from '@mdb/flora';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const Root = ({ children, ...rest }: { children: ArticleNode[] }) => {
    return children.map((child: ArticleNode, i: number) => (
        <VerticalSectionSpacing key={i} top="xxsmall" bottom="xxsmall">
            <ComponentFactory {...rest} key={i} nodeData={child} />
        </VerticalSectionSpacing>
    ));
};
