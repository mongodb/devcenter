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
    // Topic pages already have an "All <TOPIC> Content" mobile option that links to the search results,
    // so don't include a rendundant option in that case.
    const mobileItems: TertiaryNavItem[] =
        items.at(0)?.url === '#all'
            ? items
            : [{ title: `All ${topic} Content`, url: '#' }, ...items];

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
                    currentUrl={mobileItems[0].url}
                    items={mobileItems}
                    isMobile={true}
                />
            </div>
        </>
    );
};

export default TertiaryNav;
