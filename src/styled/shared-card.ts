import styled from '@emotion/styled';
import { ThumbnailSizes } from '../types/thumbnail-size';

const SharedCardWrapper = styled('div')`
    padding: 32px;
    height: max-content;
    width: 336px;
    border: 1px solid #e7eeec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
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

const ContentWrapper = styled('div')``;

export {
    SharedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
};
