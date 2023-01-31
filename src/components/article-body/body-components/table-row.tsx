import React from 'react';
import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';
import { ThemeUICSSObject } from 'theme-ui';

const rowStyles: ThemeUICSSObject = {
    borderBottomWidth: 'inc30',
    borderBottomStyle: 'solid',
    borderBottomColor: 'black20',
    verticalAlign: 'top',
};

export const TableRow = ({
    align,
    children,
}: {
    align: any;
    children: any;
}) => (
    <tbody>
        <tr sx={rowStyles}>
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
