import React from 'react';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

export const TableRow = ({
    align,
    children,
}: {
    align: any;
    children: any;
}) => (
    <tbody>
        <tr>
            {children.map((column: ArticleNode, index: number) => (
                <ComponentFactory
                    // Pass the align array so we can apply alignment in TableCell
                    nodeData={{ align, index, ...column }}
                    key={index}
                />
            ))}
        </tr>
    </tbody>
);
