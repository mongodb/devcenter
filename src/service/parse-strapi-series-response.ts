import {
    SeriesEntryInResponse,
    SeriesResponse,
    SeriesType,
} from '../types/series-type';
import { SeriesEntry } from '../interfaces/series-entry';
import { Series } from '../interfaces/series';

export const parseStrapiSeriesResponse = (
    data: SeriesResponse[],
    seriesType: SeriesType
) => {
    const result: Series[] = [];
    data.forEach((series: SeriesResponse) => {
        const seriesEntries: SeriesEntry[] = [];
        series.seriesEntry.forEach((seriesEntry: SeriesEntryInResponse) => {
            const seriesEntryItem = seriesEntry[seriesType];
            seriesEntries.push(seriesEntryItem);
        });
        const seriesItem: Series = {
            title: series.title,
            seriesEntry: seriesEntries,
        };
        result.push(seriesItem);
    });
    return result;
};
