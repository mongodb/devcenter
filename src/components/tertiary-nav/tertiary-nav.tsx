import { SideNav, Link } from '@mdb/flora';

import { TertiaryNavProps, TertiaryNavItem } from './types';
import {
    smallDesktopNavFadeLeftStyles,
    smallDesktopNavStyles,
    smallDesktopNavFadeRightStyles,
    navTagStyles,
} from './styles';
import { scrollListener } from './utils';
import { useEffect } from 'react';
import { getURLPath } from '../../utils/format-url-path';

const TertiaryNav: React.FunctionComponent<TertiaryNavProps> = ({
    items,
    topic,
}) => {
    const mobileItems: TertiaryNavItem[] = [
        { title: `All ${topic} Content`, url: '#' },
        ...items,
    ];
    useEffect(() => {
        const navScroll = document.getElementById('navScroll');
        navScroll?.removeEventListener('scroll', scrollListener);
        navScroll?.addEventListener('scroll', scrollListener);
    }, []);
    return (
        <>
            <div sx={smallDesktopNavStyles}>
                <span
                    sx={smallDesktopNavFadeLeftStyles}
                    id="navScrollFadeLeft"
                />
                <nav sx={navTagStyles} id="navScroll">
                    {items.map(({ title, url }) => (
                        <Link href={getURLPath(url)} key={title} navItem={true}>
                            {title}
                        </Link>
                    ))}
                </nav>
                <span
                    sx={smallDesktopNavFadeRightStyles}
                    id="navScrollFadeRight"
                />
            </div>
            <div
                sx={{
                    display: ['block', null, null, 'none'],
                    'nav > div': {
                        position: 'static',
                        width: 'auto',
                        overflow: 'hidden',
                    },
                }}
            >
                <SideNav
                    currentUrl="#"
                    items={mobileItems}
                    isMobile={true}
                />
            </div>
        </>
    );
};

export default TertiaryNav;
