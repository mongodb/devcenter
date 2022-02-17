import styled from '@emotion/styled';
import { ThumbnailSizes } from '../types/thumbnail-size';
import theme from '@mdb/flora/theme';
import { Pill, TypographyScale } from '@mdb/flora';

const SharedCardWrapper = styled('div')`
    padding: 32px;
    height: max-content;
    border: 1px solid #e7eeec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.inc50};

    // Mobile
    width: 467px;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        width: 467px;
    }
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        width: 336px;
    }
    // Desktop large
    @media only screen and (min-width: ${theme.sizes.breakpoint.xlarge}) {
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

const CardHeader = styled('div')``;

const CardFooter = styled('div')`
    height: 50px;
`;

const StyledPill = styled(Pill)`
    // Mobile
    line-height: 24px;
    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        line-height: 24px;
    }
    // Desktop small
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        line-height: 34px;
    }
    // Desktop large
    @media only screen and (min-width: ${theme.sizes.breakpoint.xlarge}) {
        line-height: 34px;
    }
`;

const ContentWrapper = styled('div')``;

export {
    SharedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
    StyledPill,
};
