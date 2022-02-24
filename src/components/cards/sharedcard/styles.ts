import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { HorizontalRule, Pill, TypographyScale } from '@mdb/flora';
import { PillCategory } from '../../../types/pill-category';
import { pillColorMap } from '../styles';
import Image from 'next/image';

const SharedCardWrapper = styled('div')`
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

const ThumbnailImage = styled(Image)`
    border-radius: ${theme.radii.inc30};
`;

const ThumbnailWrapper = styled('div')`
    // Mobile
    margin-bottom: ${theme.space.elementXSmall};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-bottom: ${theme.space.elementSmall};
    }
`;

const IntrinsicRatioWrapper = styled('div')`
    position: relative;
    // 16:9 ratio
    padding-top: 56.25%;
`;

const FooterContent = styled('div')`
    // Mobile
    margin-top: ${theme.space.elementXSmall};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-top: ${theme.space.elementSmall};
    }
`;

type PillProps = {
    pillCategory: PillCategory;
};

const StyledPill = styled(Pill)`
    margin-bottom: ${theme.space.elementXSmall};
    background-color: ${(props: PillProps) => pillColorMap[props.pillCategory]};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding: ${theme.space.base} ${theme.space.elementSmall};
        letter-spacing: ${theme.letterSpacings.eyebrow};
    }
`;

const StyledTitle = styled(TypographyScale)`
    margin-bottom: ${theme.space.elementXSmall};
`;

const StyledDescription = styled(TypographyScale)``;

const StyledHorizontalRule = styled(HorizontalRule)`
    // Mobile
    margin-top: ${theme.space.elementSmall};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-top: ${theme.space.elementMedium};
    }
`;

export {
    SharedCardWrapper,
    ThumbnailImage,
    FooterContent,
    StyledPill,
    ThumbnailWrapper,
    StyledHorizontalRule,
    StyledTitle,
    StyledDescription,
    IntrinsicRatioWrapper,
};
