import React from 'react';

import {
    Eyebrow,
    TypographyScale,
    Link,
    Button,
    HorizontalRule,
} from '@mdb/flora';

import { SeriesCardProps } from './types';
import { seriesCardStyles } from './styles';
import SeriesList from './series-list';

const SeriesCard: React.FunctionComponent<SeriesCardProps> = ({
    series,
    currentSlug,
    className,
}) => {
    const { content, title } = series;
    const currentPieceIndex = content
        .map(({ slug }) => slug)
        .indexOf(currentSlug);

    if (currentPieceIndex === -1) {
        throw Error("Failed to find this piece's place in the series.");
    }

    const listItems = content
        .filter(({ slug }) => slug !== currentSlug)
        .map(({ title, slug }) => ({ text: title, url: slug }));

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
                        <Link href={`/${content[currentPieceIndex + 1].slug}`}>
                            {content[currentPieceIndex + 1].title}
                        </Link>
                    </div>
                    <Button
                        href={`/${content[currentPieceIndex + 1].slug}`}
                        variant="secondary"
                        size="small"
                        customStyles={{ width: 'unset' }}
                    >
                        Continue
                    </Button>
                    <HorizontalRule spacing="large" />
                </>
            )}
            <TypographyScale variant="heading6" sx={{ marginBottom: 'inc40' }}>
                More in this series
            </TypographyScale>
            <SeriesList items={listItems} />
        </div>
    );
};

export default SeriesCard;
