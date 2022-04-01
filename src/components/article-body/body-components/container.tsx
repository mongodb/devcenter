import React from 'react';
import { ComponentFactory } from '../component-factory';

export const Container = ({ argument, children, ...rest }) => {
    return (
        <div>
            {children.map((element, index) => (
                <ComponentFactory {...rest} nodeData={element} key={index} />
            ))}
        </div>
    );
};
