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
import { SeriesEntry } from '../../interfaces/series-entry';
import SeriesList from './series-list';

const findNextInSeries = (
    seriesEntries: SeriesEntry[],
    currentTitle: string
): SeriesEntry | undefined => {
    const titles = seriesEntries.map(se => se.title);
    const index = titles.indexOf(currentTitle);
    let nextItem;
    if (index >= 0 && index < titles.length - 1)
        nextItem = seriesEntries[index + 1];
    return nextItem;
};

const SeriesCard: React.FunctionComponent<SeriesCardProps> = ({
    series,
    currentTitle,
    className,
}) => {
    const nextInSeries = findNextInSeries(series.seriesEntry, currentTitle);

    const listItems = series.seriesEntry
        .filter(({ title }) => title !== currentTitle)
        .map(({ title, calculatedSlug }) => ({
            text: title,
            url: calculatedSlug,
        }));

    return (
        <div sx={seriesCardStyles} className={className}>
            <Eyebrow sx={{ marginBottom: 'inc20', fontWeight: '500' }}>
                This is part of a series
            </Eyebrow>
            <TypographyScale
                sx={{ marginBottom: ['inc40', null, null, 'inc50'] }}
                variant="heading5"
            >
                {series.title}
            </TypographyScale>

            {nextInSeries && (
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
                        <Link href={nextInSeries.calculatedSlug}>
                            {nextInSeries.title}
                        </Link>
                    </div>
                    <Button
                        href={nextInSeries.calculatedSlug}
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
