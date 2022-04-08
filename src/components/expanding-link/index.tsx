import { useState } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { Link } from '@mdb/flora';
import theme from '@mdb/flora/theme';

const linkStyles = {
    position: 'relative' as 'relative',
    transitionDuration: theme.motion.linkAnimation,
    transitionProperty: 'right',
    right: '0',
};
interface ExpandingLinkProps {
    text: string;
    href: string;
}

const ExpandingLink: React.FunctionComponent<ExpandingLinkProps> = ({
    text,
    href,
}) => {
    const [hoverStyles, setHoverStyles] = useState<ThemeUIStyleObject>({});

    const onLinkEnter = () =>
        setHoverStyles({
            right: [
                `calc(${theme.sizes.inc60} - ${theme.sizes.inc70})`,
                null,
                `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`,
            ],
        });

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
                href={href}
                linkIcon="arrow"
                sx={{
                    ...linkStyles,
                    ...hoverStyles,
                    display: ['none', null, 'inline'],
                }}
            >
                {text}
            </Link>
        </div>
    );
};

export default ExpandingLink;
