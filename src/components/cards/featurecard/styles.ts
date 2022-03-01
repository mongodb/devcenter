import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { HorizontalRule, Pill, Tag, TypographyScale } from '@mdb/flora';

import { PillCategory } from '../../../types/pill-category';
import Image from 'next/image';
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

const ThumbnailWrapper = styled('div')`
    display: none;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        display: block;
        height: 180px;
        width: 180px;
    }
`;

const StyledThumbnail = styled(Image)`
    border-radius: ${theme.radii.inc30};
`;

const CardHeader = styled('div')`
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: ${theme.space.elementXSmall};
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        grid-gap: ${theme.space.elementMedium};
    }
`;

const ContentWrapper = styled('div')``;

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
    CardHeader,
    ContentWrapper,
    TagWrapper,
    StyledPill,
    StyledDescription,
    StyledTag,
    StyledThumbnail,
    ThumbnailWrapper,
    StyledTitle,
    StyledHorizontalRule,
    FooterContent,
};
