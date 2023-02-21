import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

const container: ThemeUICSSObject = {
    position: 'fixed',
    bottom: 24,
    left: [24, null, null, 48],
    right: [24, null, null, 0],
    zIndex: 20,
    '> div': {
        height: ['100%', '80px'],
        width: ['100%', '414px'],
        marginBottom: 'inc30',
    },
};

const notification = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'inc40',
    py: ['inc20', null, null, 'inc30'],
    px: ['inc30', null, null, 'inc40'],
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

const success = {
    border: `1px solid ${theme.colors.green10}`,
    backgroundColor: theme.colors.green05,
    span: {
        color: theme.colors.green70,
    },
    svg: {
        stroke: theme.colors.green70,
    },
};

const error = {
    border: `1px solid ${theme.colors.red10}`,
    backgroundColor: theme.colors.red05,
    span: {
        color: theme.colors.red60,
    },
    svg: {
        stroke: theme.colors.red60,
    },
};

const info = {
    border: `1px solid ${theme.colors.blue10}`,
    backgroundColor: theme.colors.blue05,
    span: {
        color: theme.colors.blue70,
    },
    svg: {
        stroke: theme.colors.blue70,
    },
};

const warn = {
    border: `1px solid ${theme.colors.yellow20}`,
    backgroundColor: theme.colors.yellow05,
    span: {
        color: theme.colors.yellow70,
    },
    svg: {
        stroke: theme.colors.yellow70,
    },
};

const icon = {
    marginRight: 'inc30',
    minWidth: 24,
};

const styles = {
    container,
    notification,
    success,
    error,
    info,
    warn,
    icon,
};

export default styles;
