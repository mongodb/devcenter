import styled from '@emotion/styled';

const FeaturedCardWrapper = styled('div')`
    padding: 32px;
    height: 414px;
    width: 696px;
    position: static;
    border: 1px solid #e7eeec;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
`;

const ThumbnailImage = styled('img')`
    border-radius: 8px;
    width: 180px;
    height: 180px;
`;

const CardHeader = styled('div')`
    height: 313.5px;
    display: flex;
    justify-content: space-between;
`;

const CardFooter = styled('div')`
    height: 99.5px;
`;

const ContentWrapper = styled('div')`
    width: 420px;
`;

const TagWrapper = styled('div')`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export {
    FeaturedCardWrapper,
    ThumbnailImage,
    CardHeader,
    CardFooter,
    ContentWrapper,
    TagWrapper,
};
