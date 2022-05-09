import theme from '@mdb/flora/theme';

export const titleStyles = {
    marginBottom: ['inc30', null, 'inc40'],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ['start', null, 'end'],
    flexDirection: ['column' as 'column', null, 'row' as 'row'],
    gap: 'inc30',
};

export const searchBoxStyles = {
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

export const sortBoxStyles = {
    marginBottom: ['inc40', null, 'inc70'],
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
