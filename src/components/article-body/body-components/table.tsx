import React from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { ComponentFactory } from '../component-factory';
import { ArticleNode } from '../../../interfaces/article-body-node';

const headerCellStyles = (align: any, index: number): ThemeUICSSObject =>
    ({
        py: ['inc20', null, 'inc40'],
        px: ['inc20', null, 'inc30'],
        textAlign: align[index] || 'left',
        whiteSpace: 'nowrap',
    } as ThemeUICSSObject);

const headerRowStyles: ThemeUICSSObject = {
    borderBottomWidth: 'inc30',
    borderBottomStyle: 'solid',
    borderBottomColor: 'blue80',
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
        <tr sx={headerRowStyles}>
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
                <table
                    sx={{
                        borderCollapse: 'collapse',
                        border: 'none',
                        width: '100%',
                    }}
                >
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
