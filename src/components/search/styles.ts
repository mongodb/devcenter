import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

export const titleStyles: ThemeUICSSObject = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'end'],
    flexDirection: ['column', null, 'row'],
    gap: 'inc30',
    width: '100%',
};

export const searchWrapperStyles: ThemeUICSSObject = {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    gap: ['inc30', null, 'inc40'],
    gridColumn: 'span 9',
    '& > *': {
        order: '1',
    },
};

export const searchBoxStyles: ThemeUICSSObject = {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: 'calc(66% - 12px)',
    marginBottom: ['inc20', null, 'inc50'],
    '& > div': {
        maxWidth: 'unset',
    },
    'div[aria-label="input-box"]': {
        boxSizing: 'content-box',
    },
};

export const sortBoxStyles = {
    '&, & > button, & span': {
        width: '100%',
        maxWidth: 'unset',
    },
    '& > button#sort-by-dropdown': {
        height: '84px',
    },
    'div[role="dropdown"]': {
        width: '100%',
    },
    gridColumn: 'span 1',
    display: ['none', null, null, 'block'],
    flexBasis: 'calc(33% - 12px)',
};

export const dataStyles = (layout: 'list' | 'grid'): ThemeUICSSObject =>
    layout === 'list'
        ? {
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: ['inc40', null, 'inc50'],
          }
        : {
              display: 'grid',
              gridTemplateColumns: [
                  'repeat(1, 1fr)',
                  null,
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
              ],
              gap: 'inc40',
          };

export const resultsStyles: ThemeUICSSObject = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    marginTop: 'inc30',
};

export const linkStyleOverride = {
    right: [0, null, `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`],
};
