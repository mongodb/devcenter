import React from 'react';

import {
    Eyebrow,
    TypographyScale,
    Link,
    Button,
    HorizontalRule,
    List,
} from '@mdb/flora';

import { SeriesCardProps } from './types';
import { seriesCardStyles } from './styles';

const SeriesCard: React.FunctionComponent<SeriesCardProps> = ({
    series,
    currentSlug,
    className = '',
}) => {
    const { content, title } = series;
    let currentPieceIndex;
    for (let i = 0; i < content.length; i++) {
        if (content[i].slug === currentSlug) {
            currentPieceIndex = i;
            break;
        }
    }
    if (currentPieceIndex === undefined) {
        return <></>; // The slug should be in the series.
    }

    const listItems = content.map(({ title }) => ({ title }));

    return (
        <div sx={seriesCardStyles} className={className}>
            <Eyebrow sx={{ marginBottom: 'inc20' }}>
                This is part of a series
            </Eyebrow>
            <TypographyScale
                sx={{ marginBottom: ['inc40', null, null, 'inc50'] }}
                variant="heading5"
            >
                {title}
            </TypographyScale>
            {currentPieceIndex < content.length - 1 && (
                <>
                    <TypographyScale
                        variant="heading6"
                        sx={{
                            marginBottom: ['inc00', null, null, 'inc30'],
                        }}
                    >
                        Up Next
                    </TypographyScale>
                    <div sx={{ marginBottom: ['inc30', null, null, 'inc40'] }}>
                        <Link href={content[currentPieceIndex + 1].slug}>
                            {content[currentPieceIndex + 1].title}
                        </Link>
                    </div>
                    <Button
                        href={content[currentPieceIndex + 1].slug}
                        variant="secondary"
                        size="small"
                    >
                        Continue
                    </Button>
                    <HorizontalRule spacing="large" />
                </>
            )}
            <TypographyScale variant="heading6" sx={{ marginBottom: 'inc40' }}>
                More in this series
            </TypographyScale>
            <List items={listItems} glyph="circle" />
        </div>
    );
};

export default SeriesCard;
