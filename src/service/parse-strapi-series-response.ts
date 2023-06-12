import {
    SeriesEntryInResponse,
    SeriesResponse,
    SeriesType,
} from '../types/series-type';
import { SeriesEntry } from '../interfaces/series-entry';
import { CS_SeriesResponse, Series } from '../interfaces/series';

export const parseStrapiSeriesResponse = (
    data: SeriesResponse[],
    seriesType: SeriesType
) => {
    const result: Series[] = [];
    data.forEach((series: SeriesResponse) => {
        const seriesEntries: SeriesEntry[] = [];
        series.seriesEntry.forEach((seriesEntry: SeriesEntryInResponse) => {
            //for drafts strapi is returning series entry as nulls
            // eg article: null
            if (seriesEntry && seriesEntry[seriesType]) {
                const seriesEntryItem = seriesEntry[seriesType];
                seriesEntries.push(seriesEntryItem);
            }
        });
        const seriesItem: Series = {
            title: series.title,
            seriesEntry: seriesEntries,
        };
        result.push(seriesItem);
    });
    return result;
};

export const CS_parseStrapiSeriesResponse = (data: CS_SeriesResponse[]) => {
    const result: Series[] = [];
    data.forEach((series: CS_SeriesResponse) => {
        const seriesEntries: SeriesEntry[] = [];
        const seriesConnection = series.series_entryConnection.edges;
        seriesConnection.forEach(v => {
            seriesEntries.push({
                title: v.node.title,
                calculatedSlug: v.node.calculated_slug,
            });
        });
        const seriesItem: Series = {
            title: series.title,
            seriesEntry: seriesEntries,
        };
        result.push(seriesItem);
    });
    return result;
};
