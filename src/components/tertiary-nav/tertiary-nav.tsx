import { SideNav } from '@mdb/flora';

import { TertiaryNavProps, TertiaryNavItem } from './types';
import {
    smallDesktopNavFadeLeftStyles,
    smallDesktopNavStyles,
    smallDesktopNavFadeRightStyles,
    navTagStyles,
    smallDesktopNavItemStyles,
} from './styles';
import { scrollListener } from './utils';
import { useEffect } from 'react';

const TertiaryNav: React.FunctionComponent<TertiaryNavProps> = ({
    items,
    topic,
}) => {
    const mobileItems: TertiaryNavItem[] = [
        ...items,
        { title: `All ${topic} Content`, url: '#' },
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
                        <a
                            sx={smallDesktopNavItemStyles}
                            href={url}
                            key={title}
                        >
                            <span>{title}</span>
                        </a>
                    ))}
                </nav>
                <span
                    sx={smallDesktopNavFadeRightStyles}
                    id="navScrollFadeRight"
                />
            </div>
            <div sx={{ display: ['block', null, null, 'none'] }}>
                <SideNav
                    currentUrl="#"
                    items={mobileItems}
                    isMobile={true}
                ></SideNav>
            </div>
        </>
    );
};

export default TertiaryNav;
