import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { PillCategory } from '../types/pill-category';
import { Pill } from '@mdb/flora';

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
    StyledPill,
};
