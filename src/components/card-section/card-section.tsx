import { useMemo, useState } from 'react';
import { TypographyScale, Link } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { Grid, ThemeUIStyleObject } from 'theme-ui';

import Card, { getCardProps } from '../card';
import { CardSectionProps } from './types';
import {
    cardSectionListStyles,
    sectionHeadingTopStyles,
    sectionHeadingBottomStyles,
    cardListStyles,
    linkStyles,
    linkWrapperStyles,
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
}) => {
    const [hoverStyles, setHoverStyles] = useState<ThemeUIStyleObject>({});

    const onLinkEnter = () =>
        setHoverStyles({
            right: [
                `calc(${theme.sizes.inc60} - ${theme.sizes.inc70})`,
                null,
                `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`,
            ],
        });

    const onLinkLeave = () => setHoverStyles({});

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
            }}
        >
            <div sx={sectionHeadingTopStyles}>
                <TypographyScale variant="heading5">{title}</TypographyScale>
                {!isNewsAndArticle(title) && (
                    <div
                        sx={linkWrapperStyles}
                        onMouseEnter={onLinkEnter}
                        onMouseLeave={onLinkLeave}
                    >
                        <Link
                            href={getURLPath(href ? href : '#')}
                            linkIcon="arrow"
                            sx={{
                                ...linkStyles,
                                ...hoverStyles,
                                display: ['none', null, 'inline'],
                            }}
                        >
                            All {title}
                        </Link>
                    </div>
                )}
            </div>
            {contentSection}
            {!isNewsAndArticle(title) && (
                <div sx={sectionHeadingBottomStyles}>
                    <div
                        sx={linkWrapperStyles}
                        onMouseEnter={onLinkEnter}
                        onMouseLeave={onLinkLeave}
                    >
                        <Link
                            href={getURLPath(href ? href : '#')}
                            linkIcon="arrow"
                            sx={{
                                ...linkStyles,
                                ...hoverStyles,
                                display: ['inline', null, 'none'],
                            }}
                        >
                            All {title}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CardSection;
