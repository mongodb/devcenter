import { ThemeUICSSObject } from 'theme-ui';
import theme from '@mdb/flora/theme';

const tooltipArrow: ThemeUICSSObject = {
    // positioning
    position: 'absolute',

    top: ['100%', null, '50%'],
    transform: ['translateX(50%) rotate(90deg)', null, 'translateY(-50%)'],
    left: [null, null, '100%'],
    right: ['50%', null, 'initial'],
    marginLeft: [null, null, 'inc20'],
    marginTop: ['-12px', null, 'initial'],

    // styling
    borderBottom: '8px solid transparent',
    borderTop: '8px solid transparent',
    borderRight: `8px solid ${theme.colors.background.containerInverse}`,
};
const tooltipBody: ThemeUICSSObject = {
    // positioning
    position: 'absolute',
    top: ['100%', null, '50%'],
    transform: ['translateX(50%)', null, 'translateY(-50%)'],
    left: [null, null, '100%'],
    right: ['50%', null, 'initial'],
    marginLeft: [null, null, 'inc30'],
    width: 'max-content',
    maxWidth: [104, null, 208],

    // styling
    bg: 'background.containerInverse',
    color: 'text.inverse',
    borderRadius: 'tooltips',
    padding: ['inc10', null, null, 'inc20'],
    textAlign: 'left',
    fontSize: ['inc00', null, null, 'inc10'],
    lineHeight: ['inc10', null, null, 'inc20'],
    fontFamily: 'body',
    boxShadow: 'level01',
};

const styles = { tooltipArrow, tooltipBody };

export default styles;
