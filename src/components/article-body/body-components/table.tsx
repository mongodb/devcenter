import React from 'react';
import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

const headerCellStyles = (align: any, index: number) =>
    ({
        paddingTop: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingBottom: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingLeft: ['inc20', 'inc30', 'inc30', 'inc30'],
        paddingRight: ['inc20', 'inc30', 'inc30', 'inc30'],
        textAlign: align[index],
        whiteSpace: 'nowrap',
    } as ThemeUICSSObject);

const headerRowStyles = {
    borderBottom: `solid ${theme.borderWidths.inc30}`,
    borderBottomColor: theme.colors.blue80,
};

const getNestedValue = (p: any, o: any) => {
    if (!o) return null;
    return p.reduce((xs: any, x: any) => (xs && xs[x] ? xs[x] : null), o);
};

const TableHeading = ({
    align,
    headingRow,
}: {
    align: any;
    headingRow: any;
}) => (
    <thead>
        <tr sx={{ headerRowStyles }}>
            {headingRow.map((column: ArticleNode, colIndex: number) => (
                <th sx={headerCellStyles(align, colIndex)} key={colIndex}>
                    <ComponentFactory
                        nodeData={getNestedValue(['children', 0], column)}
                    />
                </th>
            ))}
        </tr>
    </thead>
);

export const Table = ({ align, children }: { align: any; children: any }) => {
    if (children?.length) {
        const headingRow = children[0]?.children || [];
        const otherRows = children.slice(1);
        return (
            <div sx={{ overflowX: 'auto' }}>
                <table sx={{ borderCollapse: 'collapse', border: 'none' }}>
                    <TableHeading align={align} headingRow={headingRow} />
                    {otherRows.map((data: ArticleNode, i: number) => (
                        // Pass the align array so we can apply alignment in TableCell
                        <ComponentFactory
                            nodeData={{ align, ...data }}
                            key={i}
                        />
                    ))}
                </table>
            </div>
        );
    }
};
