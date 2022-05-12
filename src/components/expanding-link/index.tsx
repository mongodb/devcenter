import { useState } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { Link } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { getURLPath } from '../../utils/format-url-path';

const linkStyles = {
    position: 'relative' as 'relative',
    transitionDuration: theme.motion.linkAnimation,
    transitionProperty: 'right',
    right: '0',
};
interface ExpandingLinkProps {
    text: string;
    href: string;
    hoverStyleOverrides?: ThemeUIStyleObject;
}

const ExpandingLink: React.FunctionComponent<ExpandingLinkProps> = ({
    text,
    href,
    hoverStyleOverrides,
}) => {
    const [hoverStyles, setHoverStyles] = useState<ThemeUIStyleObject>({});

    const onLinkEnter = () =>
        setHoverStyles(
            hoverStyleOverrides || {
                right: [
                    `calc(${theme.sizes.inc60} - ${theme.sizes.inc70})`,
                    null,
                    `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`,
                ],
            }
        );

    const onLinkLeave = () => setHoverStyles({});
    return (
        <div
            sx={{
                marginRight: `calc(${theme.sizes.inc70} - ${theme.sizes.inc50})`,
            }}
            onMouseEnter={onLinkEnter}
            onMouseLeave={onLinkLeave}
        >
            <Link
                href={getURLPath(href)}
                linkIcon="arrow"
                sx={{
                    ...linkStyles,
                    ...hoverStyles,
                }}
            >
                {text}
            </Link>
        </div>
    );
};

export default ExpandingLink;
