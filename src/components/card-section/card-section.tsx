import { TypographyScale } from '@mdb/flora';
import { Grid } from 'theme-ui';

import Card from '../card';
import { CardSectionProps } from './types';
import {
    cardSectionListStyles,
    sectionHeadingTopStyles,
    sectionHeadingBottomStyles,
    cardListStyles,
} from './styles';
import { getCardProps } from '../card';
import ExpandingLink from '../expanding-link';

const CardSection: React.FunctionComponent<CardSectionProps> = ({
    content,
    title,
    direction = 'row',
    allHref,
}) => {
    return (
        <div
            data-testid={`${title
                .toLowerCase()
                .replace(' ', '-')}-card-section`}
            sx={{
                gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
            }}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading5">{title}</TypographyScale>
                <div sx={{ display: ['none', null, 'block'] }}>
                    <ExpandingLink text={`All ${title}`} href={allHref} />
                </div>
            </div>
            <Grid columns={3} sx={cardSectionListStyles(direction)}>
                {content.slice(0, 3).map(piece => {
                    const cardProps = getCardProps(piece, 'medium');
                    return (
                        <Card
                            key={piece.slug}
                            {...cardProps}
                            sx={cardListStyles(direction)}
                        />
                    );
                })}
            </Grid>
            <div sx={sectionHeadingBottomStyles}>
                <ExpandingLink text={`All ${title}`} href={allHref} />
            </div>
        </div>
    );
};
export default CardSection;
