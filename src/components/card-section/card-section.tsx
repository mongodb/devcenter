import { TypographyScale, Link } from '@mdb/flora';
import { Grid } from 'theme-ui';

import Card from '../card';
import { CardSectionProps } from './types';
import {
    cardSectionListStyles,
    sectionHeadingTopStyles,
    sectionHeadingBottomStyles,
    cardListStyles,
} from './styles';
import { getCardProps } from './utils';

const CardSection: React.FunctionComponent<CardSectionProps> = ({
    content,
    title,
}) => {
    return (
        <div
            sx={{
                gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
            }}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading5">{title}</TypographyScale>
                <Link
                    href="#"
                    linkIcon="arrow"
                    sx={{ display: ['none', null, 'inline'] }}
                >
                    All {title}
                </Link>
            </div>
            <Grid columns={3} sx={cardSectionListStyles}>
                {content.slice(0, 3).map(piece => {
                    const cardProps = getCardProps(piece, 'medium');
                    return (
                        <Card
                            key={piece.slug}
                            {...cardProps}
                            sx={cardListStyles}
                        />
                    );
                })}
            </Grid>
            <div sx={sectionHeadingBottomStyles}>
                <Link href="#" linkIcon="arrow">
                    All {title}
                </Link>
            </div>
        </div>
    );
};
export default CardSection;
