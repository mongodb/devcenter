import React from 'react';
import { ComponentFactory } from '../component-factory';

export const Heading = ({ depth, children, id, ...rest }) => {
    const parentNode = {
        type: 'heading',
        depth: depth,
    };
    return (
        <div id={id}>
            <a href={`#${id}`} />
            {children.map((child, index) => (
                <ComponentFactory
                    nodeData={child}
                    key={index}
                    parentNode={parentNode}
                />
            ))}
        </div>
    );
};
