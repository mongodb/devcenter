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
import { getCardProps } from '../card';
import { h5Styles } from '../../styled/layout';

const FeaturedCardSection: React.FunctionComponent<
    FeaturedCardSectionProps
> = ({ content, className, title = 'Featured' }) => {
    if (content.length < 3) {
        return null;
    }
    return (
        <div
            data-testid="featured-card-section"
            sx={{
                gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
            }}
            className={className}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading2" sx={h5Styles}>
                    {title}
                </TypographyScale>
            </div>
            <Grid columns={6} sx={featuredCardSectionListStyles}>
                <Card
                    sx={smallFeaturedCardStyles}
                    key={content[0].slug}
                    {...getCardProps(content[0], 'small')}
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
