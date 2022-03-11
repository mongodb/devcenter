import React, { useState } from 'react';

import { Link } from '@mdb/flora';
import theme from '@mdb/flora/theme';

import { CTA } from './types';
import { CTALinkStyles } from './styles';
import { ThemeUIStyleObject } from 'theme-ui';

const CTALink: React.FunctionComponent<CTA> = ({ text, url }) => {
    const [hoverStyles, setHoverStyles] = useState<ThemeUIStyleObject>({});

    const onLinkEnter = () =>
        setHoverStyles({
            right: [
                null,
                null,
                `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`,
            ],
            marginLeft: [null, null, null, `-${theme.space.inc30}`],
        });

    const onLinkLeave = () => setHoverStyles({});

    return (
        <div
            onMouseEnter={onLinkEnter}
            onMouseLeave={onLinkLeave}
            sx={{
                marginRight: `calc(${theme.sizes.inc70} - ${theme.sizes.inc50})`,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Link
                href={url}
                key={text}
                linkIcon="arrow"
                target="_blank"
                sx={{ ...CTALinkStyles, ...hoverStyles }}
            >
                {text}
            </Link>
        </div>
    );
};

export default CTALink;
