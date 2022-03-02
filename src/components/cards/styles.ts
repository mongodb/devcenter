import theme from '@mdb/flora/theme';
import { PillCategory } from '../../types/pill-category';

interface IPillColorMap {
    [key: string]: string;
}

const pillColorMap: IPillColorMap = {
    Video: theme.colors.purple10,
    Article: theme.colors.blue10,
    'Demo App': theme.colors.yellow20,
    Tutorial: theme.colors.green20,
    Podcast: theme.colors.red20,
};

export const pillStyles = (pillCategory: PillCategory) => ({
    marginBottom: 'inc30',
    bg: pillColorMap[pillCategory],
    // Weird values but that's what figma says for the flora pills.
    px: ['inc30', null, null, 'inc40'],
    py: ['inc10', null, null, 'inc20'],
    fontSize: ['9px', null, null, 'inc00'],
    letterSpacing: ['2.5px', null, null, '3px'],
});

export const cardWrapperStyles = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
    padding: [
        theme.space.cards.paddingXXS,
        null,
        null,
        theme.space.cards.paddingXS,
    ],
    height: 'max-content',
    border: `1px solid ${theme.colors.card.default.border}`,
    boxShadow: 'level01',
    borderRadius: 'inc50',
    '&:hover': {
        border: `1px solid ${theme.colors.card.default.borderDarker}`,
        boxShadow: 'level03',
        cursor: 'pointer',
    },
    gap: ['inc40', null, null, 'inc50'],
};
