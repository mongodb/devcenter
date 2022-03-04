import { TypographyScale } from '@mdb/flora';
import { Grid } from 'theme-ui';

import Card from '../card';
import { FeaturedCardSectionProps } from './types';
import {
    featuredCardSectionListStyles,
    sectionHeadingTopStyles,
    bigFeaturedCardStyles,
    smallFeaturedCardStyles,
} from './styles';
import { getCardProps } from './utils';

const FeaturedCardSection: React.FunctionComponent<
    FeaturedCardSectionProps
> = ({ content }) => {
    return (
        <div
            sx={{
                gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
            }}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading5">Featured</TypographyScale>
            </div>
            <Grid columns={6} sx={featuredCardSectionListStyles}>
                <Card
                    sx={bigFeaturedCardStyles}
                    key={content[0].slug}
                    {...getCardProps(content[0], 'large')}
                />
                <Card
                    sx={smallFeaturedCardStyles}
                    key={content[1].slug}
                    {...getCardProps(content[1], 'small')}
                />
                <Card
                    sx={smallFeaturedCardStyles}
                    key={content[2].slug}
                    {...getCardProps(content[2], 'small')}
                />
            </Grid>
        </div>
    );
};
export default FeaturedCardSection;
