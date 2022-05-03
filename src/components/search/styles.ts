import theme from '@mdb/flora/theme';

export const titleStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
    marginBottom: ['inc30', null, 'inc40'],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'end'],
    flexDirection: ['column' as 'column', null, 'row' as 'row'],
    gap: 'inc30',
};
// TextInput doesn't support styled components, so we have to wrap it.
export const searchBoxStyles = {
    gridColumn: ['span 6', null, 'span 5', 'span 8', 'span 6'],
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

export const sortBoxStyles = {
    gridColumn: ['span 6', null, 'span 3', 'span 4', 'span 3'],
    marginBottom: ['inc40', null, 'inc70'],
};

export const dataStyles = (layout: 'list' | 'grid') =>
    layout === 'list'
        ? {
              gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column' as 'column', // theme-ui is weird about this.
              alignItems: 'center',
              width: '100%',
              gap: ['inc40', null, 'inc50'],
          }
        : {
              gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
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
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
    mx: 'auto',
};

export const linkStyleOverride = {
    right: [0, null, `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`],
};
