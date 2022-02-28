import { TypographyScale } from '@mdb/flora';
import { Grid } from 'theme-ui';

import SharedCard from '../cards/sharedcard/shared-card';
import FeatureCard from '../cards/featurecard/featured-card';
import { FeaturedCardSectionProps } from './types';
import { cardSectionListStyles, sectionHeadingTopStyles } from './styles';
import { getCardProps, getFeaturedCardProps } from './utils';

const bigFeaturedCardStyles = {
    marginBottom: ['inc30', null, '0'],
    gridColumn: ['span 2', null, 'span 6', 'span 4'],
    gridRow: ['span 1', null, null, 'span 2'],
};
const smallFeaturedCardStyles = {
    marginBottom: ['inc30', null, '0'],
    gridColumn: ['span 2', null, 'span 3', 'span 2'],
};

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
            <Grid columns={6} sx={cardSectionListStyles}>
                <FeatureCard
                    sx={bigFeaturedCardStyles}
                    key={content[0].slug}
                    {...getFeaturedCardProps(content[0])}
                />
                <SharedCard
                    sx={smallFeaturedCardStyles}
                    key={content[1].slug}
                    {...getCardProps(content[1], true)}
                />
                <SharedCard
                    sx={smallFeaturedCardStyles}
                    key={content[2].slug}
                    {...getCardProps(content[2], true)}
                />
            </Grid>
        </div>
    );
};
export default FeaturedCardSection;
