import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { HorizontalRule, Pill, TypographyScale } from '@mdb/flora';
import { PillCategory } from '../types/pill-category';
import { pillColorMap } from './pill-color';
import Image from 'next/image';

const SharedCardWrapper = styled('div')`
    padding: 32px;
    height: max-content;
    border: 1px solid #e7eeec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.inc50};
`;

const ThumbnailImage = styled(Image)`
    border-radius: 8px;
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
    width: 100%;
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
        padding: 8px 24px;
        letter-spacing: 3px;
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
