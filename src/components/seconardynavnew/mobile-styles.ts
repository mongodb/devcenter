import { ThemeUIStyleObject } from 'theme-ui';

export const navWrapperStyles = (isOpen: boolean): ThemeUIStyleObject => {
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
        boxSizing: 'border-box',
        bg: '#ffffff',
        display: ['block', null, null, 'none'],
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        width: '100%',
        zIndex: 998,
        height,
    };
};

export const secondaryLinkStyles = (isOpen: boolean): ThemeUIStyleObject => ({
    margin: 0,
    display: isOpen ? 'block' : 'none',
    px: 'inc40',
    zIndex: 21,
    overflowY: 'scroll',

    '& > li': {
        py: 'inc30',
        position: 'relative' as 'relative',

        '&:first-of-type': {
            minHeight: '30px',
            paddingTop: 'inc40',
        },
        '&:not(:last-child)': {
            borderBottom: 'solid #e7eeec 1px',
        },
    },
});
export const MainLinkStyles = {
    fontSize: 'inc30',
    fontWeight: 500,
    paddingLeft: 'inc50',
    paddingTop: 'inc30',
    paddingBottom: 'inc30',
    'span.textlink-default-text-class': {
        color: '#000!important',
        fontSize: '18px!important',
        '&:hover': {
            borderBottom: '2px solid transparent!important',
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

export const plusOrMinusStylesForDropDowns = {
    position: 'absolute' as 'absolute',
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

export const chevronStylesForMainLink = {
    display: 'inline',
    position: 'absolute' as 'absolute',
    right: 'inc40',
    stroke: 'icon.system.success',
};

export const DropDownStyles = {
    position: 'relative' as 'relative',
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
export const StylesDropDownMenuList = {
    listStyleType: 'none' as 'none',
    whiteSpace: 'nowrap' as 'nowrap',
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
        listStyleType: 'none' as 'none',
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
