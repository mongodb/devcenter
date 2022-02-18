import styled from '@emotion/styled';
import { ThumbnailSizes } from '../types/thumbnail-size';
import theme from '@mdb/flora/theme';
import { HorizontalRule, Pill, TypographyScale } from '@mdb/flora';
import { PillCategory } from '../types/pill-category';

const SharedCardWrapper = styled('div')`
    padding: 32px;
    height: max-content;
    border: 1px solid #e7eeec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.inc50};

    // Mobile
    width: 467px;
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        width: 336px;
    }
`;

type ThumbnailProps = {
    size: ThumbnailSizes;
};

const thumbnailSizeMap = {
    small: { height: '64px', width: '64px' },
    medium: { height: '96px', width: '96px' },
    large: { height: '184px', width: '327px' },
};

const ThumbnailImage = styled('img')`
    height: ${(props: ThumbnailProps) => thumbnailSizeMap[props.size].height};
    width: ${(props: ThumbnailProps) => thumbnailSizeMap[props.size].width};
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

const pillColorMap = {
    VIDEO: '#F9EBFF',
    ARTICLE: '#E3FCF7',
    'DEMO APP': '#FFEC9E',
    TUTORIAL: '#E9FF99',
    PODCAST: '#FFCDC7',
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
};
