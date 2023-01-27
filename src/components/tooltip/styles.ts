import { ThemeUICSSObject } from 'theme-ui';
import theme from '@mdb/flora/theme';
import { layers } from '../../styled/layout';

const tooltipArrow = (alwaysBelow: boolean): ThemeUICSSObject => ({
    // positioning
    position: 'absolute',

    top: alwaysBelow ? '100%' : ['100%', null, '50%'],
    transform: alwaysBelow
        ? 'translateX(50%) rotate(90deg)'
        : ['translateX(50%) rotate(90deg)', null, 'translateY(-50%)'],
    left: alwaysBelow ? null : [null, null, '100%'],
    right: alwaysBelow ? '50%' : ['50%', null, 'initial'],
    marginLeft: alwaysBelow ? null : [null, null, 'inc20'],
    marginTop: alwaysBelow ? 'inc10' : ['inc10', null, 'initial'],

    // styling
    borderBottom: '8px solid transparent',
    borderTop: '8px solid transparent',
    borderRight: `8px solid ${theme.colors.background.containerInverse}`,

    zIndex: layers.tooltip,
});
const tooltipBody = (alwaysBelow: boolean): ThemeUICSSObject => ({
    // positioning
    position: 'absolute',
    top: alwaysBelow ? '100%' : ['100%', null, '50%'],
    transform: alwaysBelow
        ? 'translateX(50%)'
        : ['translateX(50%)', null, 'translateY(-50%)'],
    left: alwaysBelow ? null : [null, null, '100%'],
    right: alwaysBelow ? '50%' : ['50%', null, 'initial'],
    marginLeft: alwaysBelow ? null : [null, null, 'inc30'],
    marginTop: alwaysBelow ? 'inc30' : ['inc30', null, 'initial'],
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

    zIndex: layers.tooltip,
});

const styles = { tooltipArrow, tooltipBody };

export default styles;
