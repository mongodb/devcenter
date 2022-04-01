import React from 'react';
import { ComponentFactory } from '../component-factory';
import theme from '@mdb/flora/theme';

const headerCellStyles = (align, index) => {
    const alignment = align[index];
    return {
        paddingTop: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingBottom: ['inc20', 'inc40', 'inc40', 'inc40'],
        paddingLeft: ['inc20', 'inc30', 'inc30', 'inc30'],
        paddingRight: ['inc20', 'inc30', 'inc30', 'inc30'],
        textAlign: alignment,
        whiteSpace: 'nowrap',
    };
};

const headerRowStyles = () => {
    return {
        borderBottom: `solid ${theme.borderWidths.inc30}`,
        borderBottomColor: theme.colors.blue80,
    };
};

const getNestedValue = (p, o) => {
    if (!o) return null;
    return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
};

const TableHeading = ({ align, headingRow }) => (
    <thead valign="bottom">
        <tr sx={{ headerRowStyles }}>
            {headingRow.map((column, colIndex) => (
                <th sx={headerCellStyles(align, colIndex)} key={colIndex}>
                    <ComponentFactory
                        nodeData={getNestedValue(['children', 0], column)}
                    />
                </th>
            ))}
        </tr>
    </thead>
);

export const Table = ({ align, children }) => {
    if (children?.length) {
        const headingRow = children[0]?.children || [];
        const otherRows = children.slice(1);
        return (
            <div sx={{ overflowX: 'auto' }}>
                <table sx={{ borderCollapse: 'collapse', border: 'none' }}>
                    <TableHeading align={align} headingRow={headingRow} />
                    {otherRows.map((data, i) => (
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
