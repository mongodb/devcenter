import { ComponentFactory } from '../component-factory';
import React from 'react';

export const Paragraph = ({ children, ...rest }) => {
    return (
        <>
            {children.map((child, index) => (
                <ComponentFactory {...rest} key={index} nodeData={child} />
            ))}
        </>
    );
};
