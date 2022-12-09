import { ThemeUICSSObject } from 'theme-ui';
import { layers } from '../../styled/layout';

export const navWrapperStyles = (isOpen: boolean): ThemeUICSSObject => {
    let height = 'auto';
    const NAVBAR_HEIGHT = 56;

    if (isOpen) {
        // Calculate the total height that the dropdown and secondary nav should be.
        // Since the consistent nav is not sticky, this height will vary based on the viewport's vertical offset.
        let topOffset = window?.visualViewport?.pageTop || 0;
        if (topOffset > NAVBAR_HEIGHT) {
            topOffset = NAVBAR_HEIGHT; // Only want to compensate up to the navbar's height.
        }
        const navBarShowing = NAVBAR_HEIGHT - topOffset;

        height = `calc(100vh - ${navBarShowing}px)`;
    }

    return {
        bg: '#ffffff',
        display: ['block', null, null, 'none'],
        position: 'sticky',
        top: 0,
        overflowY: isOpen ? 'auto' : 'visible', // Need the user menu to be visible when not open.
        width: '100%',
        zIndex: layers.secondaryNav,
        height,
    };
};

export const secondaryLinkStyles = (isOpen: boolean): ThemeUICSSObject => ({
    margin: 0,
    display: isOpen ? 'block' : 'none',
    px: 'inc40',
    overflowY: 'scroll',

    '& > li': {
        py: 'inc30',
        position: 'relative',

        '&:first-of-type': {
            minHeight: '30px',
            paddingTop: 'inc40',
        },
        '&:not(:last-child)': {
            borderBottom: 'solid #e7eeec 1px',
        },
    },
});

export const MainLinkStyles: ThemeUICSSObject = {
    width: '100%',
    fontSize: 'inc30',
    fontWeight: 500,
    py: 'inc30',

    'span.textlink-default-text-class': {
        color: '#000!important',
        fontSize: '18px!important',

        '&, &:hover': {
            border: '0 !important',
        },
    },
};

export const StylesFloraLink = {
    display: 'inline-block',
    paddingLeft: 'inc40',
    lineHeight: 'normal',
    'span.textlink-default-text-class': {
        color: '#000',
        fontSize: 'inc20',
        fontFamily: 'body',
        fontWeight: '300',
        '&:hover': {
            borderBottom: '2px solid transparent !important',
        },
    },
};

export const StylesFloraLinkChevronRight = {
    display: 'flex',
    paddingLeft: 'inc40',
    lineHeight: 'normal',
    span: {
        color: 'default!important',
        fontSize: 'inc20',
        fontFamily: 'body',
        fontWeight: '300',
        '&:hover': {
            borderBottom: 'solid 2px transparent !important',
        },
    },
};

export const plusOrMinusStylesForDropDowns: ThemeUICSSObject = {
    position: 'absolute',
    right: '0',
};

export const aLinkStyles = {
    display: 'inline-block',
    alignItems: 'center',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,

    '.all-link .textlink-default-text-class': {
        color: '#006cfa',
    },

    '&:hover': {
        color: 'text.selected',
        textDecoration: 'none',
    },
};

export const chevronStylesForMainLink: ThemeUICSSObject = {
    display: 'inline',
    stroke: 'icon.system.success',
};

export const userMenuStyles: ThemeUICSSObject = {
    minWidth: 'inc60',
    marginLeft: 'auto',
};

export const DropDownStyles: ThemeUICSSObject = {
    position: 'relative',
};

export const StylesDropDownWrapper = {
    '.dropdown-titles': {
        display: 'inline-block',
        fontSize: 'inc40',
        marginBottom: 'inc40',
    },
    backgroundColor: '#fff',
    color: '#000',
};
export const StylesDropDownMenuList: ThemeUICSSObject = {
    listStyleType: 'none',
    whiteSpace: 'nowrap',
    paddingTop: 'inc30',
    paddingLeft: 0,
    // L2
    'li:not(:last-child)': {
        paddingBottom: 'inc30',
    },
};

// L2
export const StylesSubLinks = {
    backgroundColor: '#f5f7fa',
    listStyleType: 'none',
    paddingTop: 'inc40',
    paddingBottom: 'inc40',
    marginLeft: '-inc40',
    marginRight: '-inc40',
    /* L3 */
    '> li': {
        paddingLeft: 'inc50',
        '.textlink-default-text-class': {
            color: '#000',
        },

        '&:not(:last-child)': {
            paddingBottom: 'inc50',
        },
    },

    ul: {
        listStyleType: 'none',
        paddingLeft: 'inc40',
        paddingTop: 'inc40',
        /* L4 */
        '> li:not(:last-child)': {
            paddingBottom: 'inc60',
        },
        '> li:last-child': {
            color: '#006cfa',
        },
    },
};
