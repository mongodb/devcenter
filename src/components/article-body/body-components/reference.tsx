import React from 'react';
import { ComponentFactory } from '../component-factory';
import { Link } from '@mdb/flora';

export const Reference = ({ children, url }) => {
    const isAnchor = url.startsWith('#');
    const targetType = isAnchor ? '_self' : '_blank';
    return (
        <Link sx={{ display: 'inline-block' }} href={url} target={targetType}>
            {children.map((child, index) => (
                <ComponentFactory nodeData={child} key={index} />
            ))}
        </Link>
    );
};
