import React from 'react';
import { ComponentFactory } from '../component-factory';
import { VerticalSectionSpacing } from '@mdb/flora';

export const Root = ({ children, ...rest }) => {
    return children.map((child, i) => (
        <VerticalSectionSpacing key={i} top="xxsmall" bottom="xxsmall">
            <ComponentFactory {...rest} key={i} nodeData={child} />
        </VerticalSectionSpacing>
    ));
};
