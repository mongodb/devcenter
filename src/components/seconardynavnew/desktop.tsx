import { useState } from 'react';
import theme from '@mdb/flora/theme';

import { ESystemIconNames, Link as FloraLink, SystemIcon } from '@mdb/flora';
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
        marginRight: theme.space.inc40,
    },
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
    marginRight: 'inc90',
    fontSize: 'inc30',
    fontWeight: 500,

    'span.textlink-default-text-class': hoverLinkStyles(isActive),
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
        setIsOpen(!isOpen);
    };

    return (
        <div
            sx={{
                display: ['none', 'none', 'none', 'block'],
                borderBottom: 'solid 1px black30',
            }}
        >
            <nav sx={StyledSecondaryNavContainer}>
                <div sx={linkWrapperStyles}>
                    <FloraLink
                        href={getURLPath('/')}
                        sx={MainLinkStyles(activePath === '/' ? true : false)}
                    >
                        Developer Center
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
                                        <DropDownMenu items={dropDownItems} />
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
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
