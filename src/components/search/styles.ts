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
    marginBottom: ['inc20', null, 'inc40'],
    '& > div': {
        maxWidth: 'unset',
    },
    'span[aria-label="left-icon"]': {
        height: 'inc20',
        margin: '0',
        marginRight: 'inc20',

        svg: {
            height: 'inc20',
            width: 'inc20',
        },
    },
};

export const sortBoxStyles = {
    '&, & > button, & span': {
        width: '100%',
        maxWidth: 'unset',
    },
    '& > button#sort-by-dropdown': {
        height: '80px',
    },
    'div[role="dropdown"]': {
        width: '100%',
    },
    gridColumn: 'span 1',
    display: ['none', null, null, 'block'],
    flexBasis: 'calc(33% - 12px)',
};

export const locationBoxStyles = {
    width: ['100%', null, 'calc(33% - 12px)'],
    div: {
        maxWidth: '100%',
    },
    'span[aria-label="left-icon"]': {
        height: 'inc20',
        margin: '0',
        marginRight: 'inc20',

        svg: {
            height: 'inc20',
            width: 'inc20',
        },
    },
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
