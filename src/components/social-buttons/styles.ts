import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

const styles = {
    container: {
        display: 'flex',
        gap: 'inc30',
        span: {
            display: 'block !important', // Override next/image default styling
        },
    },
    circle: {
        borderRadius: 'circle',
        background: theme.colors.background.containerInverse,
        cursor: 'pointer',
        padding: '6px',
    },
    copyLinkBtn: {
        outline: 'none',
        border: 'none',
        background: 'transparent',
    },
    tooltipWrapper: {
        position: 'absolute',
        top: 28,
        bottom: 0,
        left: -4,
        right: 0,
    } as ThemeUICSSObject,
    tooltipArrow: {
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        marginLeft: 'base',
        borderBottom: `8px solid ${theme.colors.background.containerInverse}`,
    },
    tooltipBody: {
        bg: 'background.containerInverse',
        color: 'text.inverse',
        borderRadius: 'tooltips',
        padding: ['inc10', null, null, 'inc20'],
        textAlign: 'left',
        fontSize: ['inc00', null, null, 'inc10'],
        lineHeight: ['inc10', null, null, 'inc20'],
        fontFamily: 'body',
        width: 'max-content',
        boxShadow: 'level01',
    } as ThemeUICSSObject,
};

export default styles;
