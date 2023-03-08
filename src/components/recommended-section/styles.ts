import { ThemeUICSSObject } from 'theme-ui';
import theme from '@mdb/flora/theme';
import { h5Styles } from '../../styled/layout';

export const recommendedSectionStyles: ThemeUICSSObject = {
    margin: 'auto',
    maxWidth: theme.sizes.maxWidthDesktop,
    marginBottom: 'section40',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
};

export const recommendedSectionHeadingStyles = {
    ...h5Styles,
    marginBottom: 'inc20',
    flexGrow: 1,
    order: 1,
};

export const recommendedSectionSubheadingStyles = {
    display: 'block',
    marginBottom: 'inc50',
    flexBasis: '100%',
    order: 1,
};

export const digestCheckboxStyles = {
    display: 'flex',
    marginBottom: 'inc50',
    '& label': {
        margin: 'auto',
    },
};

export const topicSaveButtonStyles = {
    display: 'flex',
    width: '100%',
    '& button': {
        margin: 'auto',
    },
};

export const topicSaveButtonWrapperStyles = {
    width: '100%',
    display: 'flex',
    '& > div': {
        margin: 'auto',
    },
};

export const footerStyles = (show: boolean) => ({
    maxHeight: show ? '106px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.25s ease-in-out',
    flexBasis: '100%',
    order: 3,
});

export const placeholderStyles = (contentLength: number) => {
    const gridColumnValues = [
        ['auto', null, null, '2 / span 2', null, '2 / span 3'],
        ['auto', null, '1 / span 2', 'auto', null, '3 / span 2'],
        'auto',
    ];

    return {
        gridColumn: gridColumnValues[contentLength - 1],
        height: 'calc(100% - 62px)',
    };
};

export const recommendedContentTaglineStyles: ThemeUICSSObject = {
    textAlign: 'center',
    display: 'block',
    flexBasis: 'inc50',
    marginTop: 'inc30',
};

export const recommendedContentGridStyles = {
    overflow: 'visible',
    flexBasis: '100%',
    order: 1,
    marginBottom: ['inc30', null, null, 0],
    marginTop: 'inc50',
};

export const followTopicsArrowStyles = {
    alignSelf: 'flex-end',
    margin: 'auto 0',
    marginBottom: [0, null, null, 'auto'],
    flexBasis: ['100%', null, null, 'auto'],
    flexShrink: 1,
    order: [2, null, null, 1],
};
