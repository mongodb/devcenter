import { ComponentFactory } from '../component-factory';
import React from 'react';

export const List = ({ children, ordered, ...rest }) => {
    return ordered === false ? (
        <ul>
            {children.map((child, index) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </ul>
    ) : (
        <ol>
            {children.map((child, index) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </ol>
    );
};
