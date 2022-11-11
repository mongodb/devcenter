import theme from '@mdb/flora/theme';
import { FlexProps, StylePropertyValue } from 'theme-ui';

export const titleStyles = {
    marginBottom: ['inc30', null, 'inc40'],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'end'],
    flexDirection: ['column' as 'column', null, 'row' as 'row'],
    gap: 'inc30',
};

export const searchBoxSortBarWrapperStyles = {
    display: 'grid',
    marginBottom: ['inc40', null, 'inc70'],
    columnGap: 'inc40',
    rowGap: 'inc30',
};

export const searchWrapperStyles = {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: 'inc40',
    gridColumn: 'span 9',
    '& > *': {
        order: '1',
    },
};

export const searchBoxStyles = {
    flexGrow: '1',
    flexShrink: '1',
    '& > div': {
        maxWidth: 'unset',
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
    gridColumn: 'span 1',
    display: ['none', null, null, 'block'],
    flexBasis: '33%',
};

export const dataStyles = (layout: 'list' | 'grid') =>
    layout === 'list'
        ? {
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column' as 'column', // theme-ui is weird about this.
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

export const loadMoreStyles = {
    marginTop: ['inc70', null, 'inc90'],
    mx: 'auto',
};

export const linkStyleOverride = {
    right: [0, null, `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`],
};
