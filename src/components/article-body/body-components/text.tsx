import React from 'react';
import { TypographyScale, TypographyVariantType } from '@mdb/flora';

const headingToTypographyMap: {
    [key: string]: TypographyVariantType;
} = {
    '0': 'body1',
    '1': 'heading3',
    '2': 'heading4',
    '3': 'heading5',
    '4': 'heading6',
};

const getTypographyVariantForHeading = (
    depth: string
): TypographyVariantType => {
    if (depth in Object.keys(headingToTypographyMap)) {
        return headingToTypographyMap[depth];
    }
    return 'body1';
};

export const Text = ({
    value,
    type,
    depth,
}: {
    value: string;
    type?: string;
    depth?: string;
}) => {
    let variant: TypographyVariantType = 'body1';

    if (type === 'heading') {
        variant = getTypographyVariantForHeading(depth || '0');
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
