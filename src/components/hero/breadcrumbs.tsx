import React from 'react';
import { ESystemIconNames } from '@mdb/flora';
import { Link, SystemIcon, Eyebrow } from '@mdb/flora';
import theme from '@mdb/flora/theme';

import { BreadcrumbsProps } from './types';

import {
    breadcrumbsContainerStyles,
    breadcrumbStyles,
    linkStyles,
} from './styles';

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({ crumbs }) => {
    const crumbLength = crumbs.length;
    return (
        <div sx={breadcrumbsContainerStyles}>
            {crumbs.map(({ text, url }, i) => (
                <div key={text} sx={breadcrumbStyles}>
                    <Link navItem={true} href={url} sx={linkStyles}>
                        {/* The negative margin is to offset the added 3px from the letter-spacing on the last character that Flora adds.*/}
                        <Eyebrow sx={{ marginRight: '-3px' }}>{text}</Eyebrow>
                    </Link>
                    {i < crumbLength - 1 && (
                        <SystemIcon
                            color="success"
                            strokeWeight="medium"
                            name={ESystemIconNames.CHEVRON_RIGHT}
                            sx={{ height: `calc(${theme.sizes.inc00} * 3)` }}
                        ></SystemIcon>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumbs;
