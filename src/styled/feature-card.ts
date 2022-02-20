import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { PillCategory } from '../types/pill-category';
import { Pill, Tag, TypographyScale } from '@mdb/flora';
import Image from 'next/image';

const FeaturedCardWrapper = styled('div')`
    padding: 32px;
    height: max-content;
    border: 1px solid #e7eeec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.inc50};

    // Mobile
    width: 375px;
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        width: 696px;
    }
`;

type PillProps = {
    pillCategory: PillCategory;
};

const pillColorMap = {
    VIDEO: '#F9EBFF',
    ARTICLE: '#E3FCF7',
    'DEMO APP': '#FFEC9E',
    TUTORIAL: '#E9FF99',
    PODCAST: '#FFCDC7',
};

const StyledPill = styled(Pill)`
    background-color: ${(props: PillProps) => pillColorMap[props.pillCategory]};
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding: 8px 24px;
        letter-spacing: 3px;
    }
`;

const ThumbnailWrapper = styled('div')`
    height: 96px;
    width: 96px;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        height: 180px;
        width: 180px;
    }
`;

const StyledThumbnail = styled(Image)`
    border-radius: 8px;
`;

const CardHeader = styled('div')`
    display: flex;
    column-gap: ${theme.space.elementXSmall};
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        column-gap: ${theme.space.elementMedium};
    }
`;

const ContentWrapper = styled('div')``;

const TagWrapper = styled('div')`
    display: flex;
    gap: 10px;
`;

const StyledDescription = styled(TypographyScale)`
    display: none;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        display: block;
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
        padding: 8px 16px;
        font-size: 16px;
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
};
