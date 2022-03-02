import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { HorizontalRule, Pill, Tag, TypographyScale } from '@mdb/flora';

import { PillCategory } from '../../../types/pill-category';
import { pillColorMap } from '../styles';

const FeaturedCardWrapper = styled('div')`
    padding: ${theme.space.cards.paddingXXS};
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding: ${theme.space.cards.paddingXS};
    }
    height: max-content;
    border: ${theme.colors.card.default.border};
    box-shadow: ${theme.shadows.level01};
    border-radius: ${theme.radii.inc50};
    :hover {
        border: ${theme.colors.card.default.borderDarker};
        box-shadow: ${theme.shadows.level03};
    }
`;

type PillProps = {
    pillCategory: PillCategory;
};

const StyledPill = styled(Pill)`
    margin-bottom: ${theme.space.elementXSmall};
    background-color: ${(props: PillProps) => pillColorMap[props.pillCategory]};
    //Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding: ${theme.space.base} ${theme.space.elementSmall};
        letter-spacing: ${theme.letterSpacings.eyebrow};
    }
`;

export const thumbnailWrapperStyles = (
    category: PillCategory,
    listView: boolean
) => {
    // Tutorials don't have thumbnails in mobile.
    const mobileDisplay =
        listView || category !== 'Tutorial' ? 'block' : 'none';
    // Video thumbnail have a 16:9 aspect ration instead of fixed dimensions in mobile.
    const mobileAspectRatio =
        category === 'Video' ? { aspectRatio: '16 / 9' } : {};

    // Mobile thumbnail dimensions vary by content type.
    let mobileDimensions;
    if (listView) {
        mobileDimensions = '96px';
    } else {
        switch (category) {
            case 'Article':
                mobileDimensions = '64px';
                break;
            case 'Demo App':
                mobileDimensions = '96px';
                break;
            case 'Podcast':
                mobileDimensions = '48px';
                break;
            // case 'Quickstart':
            //     mobileDimensions = '96px';
            //     break;
            default:
                mobileDimensions = null;
        }
    }
    return {
        display: [mobileDisplay, null, 'block'],
        flexShrink: 0,
        position: 'relative' as 'relative',
        ...mobileAspectRatio,
        width: [mobileDimensions, null, '180px'],
        height: [mobileDimensions, null, '180px'],
    };
};

export const cardHeaderStyles = (listView: boolean) => {
    const mobileFlexDirection = listView
        ? ('row' as 'row')
        : ('column' as 'column');
    return {
        display: 'flex',
        gap: ['inc30', null, 'inc50'],
        flexDirection: [
            mobileFlexDirection,
            mobileFlexDirection,
            'row' as 'row',
        ],
    };
};

const TagWrapper = styled('div')`
    display: flex;
    //need confirmation
    gap: ${theme.space.base};
    flex-wrap: wrap;
`;

const StyledTitle = styled(TypographyScale)`
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        margin-bottom: ${theme.space.elementXSmall};
    }
`;

const StyledDescription = styled(TypographyScale)`
    display: none;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        display: block;
        margin-bottom: ${theme.space.elementMedium};
    }
`;

const StyledTag = styled(Tag)`
    // Mobile
    display: none;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        display: block;
    }
    //desktop
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding: ${theme.space.base} ${theme.space.elementXSmall};
        font-size: ${theme.fontSizes.inc20};
    }
`;

const StyledHorizontalRule = styled(HorizontalRule)`
    // Mobile
    margin-top: ${theme.space.elementSmall};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-top: ${theme.space.elementMedium};
    }
`;

const FooterContent = styled('div')`
    // Mobile
    margin-top: ${theme.space.elementXSmall};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-top: ${theme.space.elementSmall};
    }
`;

export {
    FeaturedCardWrapper,
    TagWrapper,
    StyledPill,
    StyledDescription,
    StyledTag,
    StyledTitle,
    StyledHorizontalRule,
    FooterContent,
};
