import React from 'react';
import { TypographyScale } from '@mdb/flora';

const headingToTypographyMap = {
    '1': 'heading3',
    '2': 'heading4',
    '3': 'heading5',
    '4': 'heading6',
};

const getTypographyVariantForHeading = (depth: string) => {
    if (depth in Object.keys(headingToTypographyMap)) {
        return headingToTypographyMap[depth];
    }
    return 'body1';
};

export const Text = ({ value, ...rest }) => {
    const { parentNode } = rest;
    let variant = 'body1';
    if (parentNode && parentNode['type'] === 'heading') {
        variant = getTypographyVariantForHeading(parentNode['depth']);
    }
    return (
        <TypographyScale
            variant={variant}
            sx={{
                color: ['inherit'],
            }}
        >
            {value}
        </TypographyScale>
    );
};
