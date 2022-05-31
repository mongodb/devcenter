import { useEffect, useRef, useState } from 'react';
import theme from '@mdb/flora/theme';

import {
    ESystemIconNames,
    Link as FloraLink,
    SystemIcon,
    TypographyScale,
} from '@mdb/flora';
import { secondaryNavData } from '../../data/secondary-nav';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import { StyledSecondaryNavContainer } from './desktop-styles';
import { getURLPath } from '../../utils/format-url-path';

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    padding: 0,
};

const StyledSecondaryLinks = {
    padding: 0,
    margin: 0,
    overflow: 'visible',
    'li:not(:last-child)': {
        marginRight: [
            null,
            null,
            null,
            theme.space.inc40,
            theme.space.inc50,
            theme.space.inc90,
        ],
    },
    whiteSpace: 'nowrap' as 'nowrap',
};

const hoverLinkStyles = (isActive: boolean) => ({
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    color: theme.colors.text.default,
    borderBottomColor: isActive ? 'green40' : 'transparent',
    ':hover': {
        borderBottomColor: 'green40',
    },
});

const MainLinkStyles = (isActive: boolean) => ({
    float: 'left' as 'left',
    marginRight: ['inc60', 'inc60', 'inc60', 'inc90', 'inc90', 'inc90'],
    fontWeight: 500,

    'span.textlink-default-text-class': {
        ...hoverLinkStyles(isActive),
        color: theme.colors.text.default,
        ':hover': {
            borderBottomColor: `${theme.colors.green40}`,
        },
    },
    ':hover': {
        borderBottomColor: `${theme.colors.green40}`,
    },
});

const FloraLinkStyles = (isActive: boolean) => ({
    display: 'inline-block',
    'span.textlink-default-text-class': {
        ...hoverLinkStyles(isActive),
        fontSize: [null, null, 'inc10', 'inc20'],
        fontFamily: 'body',
        fontWeight: '300',
    },
});

const DesktopView = ({ activePath }: { activePath: string | undefined }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(isOpen => !isOpen);
    };
    const dropdownEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (event: MouseEvent) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (
                isOpen &&
                dropdownEl.current &&
                !dropdownEl.current.contains(event.target as HTMLDivElement)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [isOpen]);

    return (
        <div
            sx={{
                display: ['none', 'none', 'none', 'block'],
                borderBottom: [
                    null,
                    null,
                    null,
                    `solid 1px ${theme.colors.black30}`,
                ],
                px: ['inc40', null, 'inc50', 'inc70'],
            }}
        >
            <nav sx={StyledSecondaryNavContainer}>
                <div sx={{ ...linkWrapperStyles, whiteSpace: 'nowrap' }}>
                    <FloraLink
                        href={getURLPath('/')}
                        sx={{
                            ...MainLinkStyles(
                                activePath === '/' ? true : false
                            ),
                            marginRight: [
                                null,
                                null,
                                null,
                                'inc40',
                                'inc70',
                                'inc90',
                            ],
                        }}
                    >
                        <TypographyScale
                            variant="body1"
                            sx={{
                                fontSize: [
                                    '16px',
                                    '16px',
                                    '16px',
                                    '16px',
                                    '20px',
                                    '20px',
                                    '20px',
                                ],
                            }}
                        >
                            MongoDB Developer
                        </TypographyScale>
                    </FloraLink>
                </div>

                <ul sx={StyledSecondaryLinks}>
                    {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList key={name}>
                            {dropDownItems?.length ? (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <FloraLink
                                            sx={FloraLinkStyles(
                                                activePath === slug
                                                    ? true
                                                    : false
                                            )}
                                            onClick={onClickShowMenu}
                                        >
                                            {name}
                                            <SystemIcon
                                                sx={{
                                                    paddingLeft: 'inc20',
                                                    display: 'inline',
                                                }}
                                                name={
                                                    isOpen
                                                        ? ESystemIconNames.CHEVRON_UP
                                                        : ESystemIconNames.CHEVRON_DOWN
                                                }
                                                size="small"
                                                strokeWeight="large"
                                            />
                                        </FloraLink>
                                    </div>
                                    {isOpen && (
                                        <div ref={dropdownEl}>
                                            <DropDownMenu
                                                items={dropDownItems}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        {slug.indexOf('http://') == 0 ||
                                        slug.indexOf('https://') == 0 ? (
                                            <FloraLink
                                                target="_blank"
                                                href={slug}
                                                sx={FloraLinkStyles(
                                                    activePath === slug
                                                        ? true
                                                        : false
                                                )}
                                            >
                                                {name}
                                            </FloraLink>
                                        ) : (
                                            <FloraLink
                                                href={getURLPath(slug)}
                                                sx={FloraLinkStyles(
                                                    activePath === slug
                                                        ? true
                                                        : false
                                                )}
                                            >
                                                {name}
                                            </FloraLink>
                                        )}
                                    </div>
                                </>
                            )}
                        </SecondaryLinksList>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default DesktopView;
