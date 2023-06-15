import { useMemo } from 'react';
import { TypographyScale, Link } from '@mdb/flora';
import { Grid } from 'theme-ui';

import Card, { getCardProps } from '../card';
import { CardSectionProps } from './types';
import {
    cardSectionListStyles,
    sectionHeadingTopStyles,
    sectionHeadingBottomStyles,
    cardListStyles,
} from './styles';
import { getURLPath } from '../../utils/format-url-path';

const isNewsAndArticle = (title: string) => {
    return title.toLowerCase() === 'News & Announcements'.toLowerCase();
};

const CardSection: React.FunctionComponent<CardSectionProps> = ({
    content,
    title,
    direction = 'row',
    href,
    extraStyles = {},
}) => {
    // Memoize so we don't re-render the cards when this hover stuff happens.
    const contentSection = useMemo(
        () => (
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
        ),
        [content]
    );

    return (
        <div
            data-testid={`${title
                .toLowerCase()
                .replace(' ', '-')}-card-section`}
            sx={{
                gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
                ...extraStyles,
            }}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading5">{title}</TypographyScale>
                {!isNewsAndArticle(title) && (
                    <Link
                        href={getURLPath(href ? href : '#')}
                        linkIcon="arrow"
                        sx={{
                            display: ['none', null, 'inline'],
                        }}
                    >
                        All {title}
                    </Link>
                )}
            </div>
            {contentSection}
            {!isNewsAndArticle(title) && (
                <div sx={sectionHeadingBottomStyles}>
                    <Link
                        href={getURLPath(href ? href : '#')}
                        linkIcon="arrow"
                        sx={{
                            display: ['inline', null, 'none'],
                        }}
                    >
                        All {title}
                    </Link>
                </div>
            )}
        </div>
    );
};
export default CardSection;
