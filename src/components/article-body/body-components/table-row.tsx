import React from 'react';
import { ComponentFactory } from '../component-factory';

export const TableRow = ({ align, children }) => (
    <tbody>
        <tr>
            {children.map((column, index) => (
                <ComponentFactory
                    // Pass the align array so we can apply alignment in TableCell
                    nodeData={{ align, index, ...column }}
                    key={index}
                />
            ))}
        </tr>
    </tbody>
);
