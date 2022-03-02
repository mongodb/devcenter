import { TypographyScale } from '@mdb/flora';
import { Grid } from 'theme-ui';

import { FeaturedLarge, FeaturedMedium } from '../cards';
import { FeaturedCardSectionProps } from './types';
import {
    featuredCardSectionListStyles,
    sectionHeadingTopStyles,
    bigFeaturedCardStyles,
    smallFeaturedCardStyles,
} from './styles';
import { getCardProps, getFeaturedCardProps } from './utils';

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
                <FeaturedLarge
                    sx={bigFeaturedCardStyles}
                    key={content[0].slug}
                    {...getFeaturedCardProps(content[1])}
                />
                <FeaturedMedium
                    sx={smallFeaturedCardStyles}
                    key={content[1].slug}
                    {...getCardProps(content[0], true)}
                />
                <FeaturedMedium
                    sx={smallFeaturedCardStyles}
                    key={content[2].slug}
                    {...getCardProps(content[2], true)}
                />
            </Grid>
        </div>
    );
};
export default FeaturedCardSection;
