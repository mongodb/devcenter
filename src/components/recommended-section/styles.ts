import { ThemeUICSSObject } from 'theme-ui';
import theme from '@mdb/flora/theme';

export const recommendedSectionStyles: ThemeUICSSObject = {
    margin: 'auto',
    maxWidth: theme.sizes.maxWidthDesktop,
    marginBottom: 'section40',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
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

    return { gridColumn: gridColumnValues[contentLength - 1] };
};
