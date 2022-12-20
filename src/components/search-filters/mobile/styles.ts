import { ThemeUICSSObject } from 'theme-ui';
import { layers } from '../../../styled/layout';

export const filtersModal: ThemeUICSSObject = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    zIndex: layers.modal,
    bg: 'black00',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
};

export const titleSection = {
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const buttonSection: ThemeUICSSObject = {
    display: 'flex',
    gap: 'inc20',
    boxShadow: 'level02',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    py: 'inc50',
    bg: 'black00',
    marginTop: 'auto',
};
