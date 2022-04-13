import React from 'react';
import { ComponentFactory } from '../component-factory';
import theme from '@mdb/flora/theme';
import { ArticleNode } from '../../../interfaces/article-body-node';

const tdStyles = (alignment: any) => {
    return {
        textAlign: alignment,
        paddingTop: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingBottom: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingLeft: ['inc20', 'inc30', 'inc30', 'inc30'],
        paddingRight: ['inc20', 'inc30', 'inc30', 'inc30'],
        textColor: theme.colors.text.default,
    };
};

export const TableCell = ({
    align,
    children,
    index,
}: {
    align: any;
    children: any;
    index: number;
}) => {
    const alignmentOption = align && index !== null && align[index];
    return (
        <td sx={tdStyles(alignmentOption)}>
            {children.map((column: ArticleNode, colIndex: number) => (
                <ComponentFactory nodeData={column} key={colIndex} />
            ))}
        </td>
    );
};
