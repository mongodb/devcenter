import { ThemeUICSSObject } from 'theme-ui';
import { layers } from '../../styled/layout';

export const tagWrapperStyles = (disappearOnMobile: boolean) =>
    ({
        display: [disappearOnMobile ? 'none' : 'flex', null, 'flex'],
        gap: 'inc20',
        flexWrap: 'wrap',
    } as ThemeUICSSObject);

export const tagStyles = {
    px: [null, null, null, 'inc30'],
    py: [null, null, null, 'inc20'],
    fontSize: [null, null, null, 'inc20'],
    zIndex: layers.desktopConsistentNav,
};
