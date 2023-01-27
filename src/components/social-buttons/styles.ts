import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

const styles: { [key: string]: ThemeUICSSObject } = {
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
};

export default styles;
