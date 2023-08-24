import { SeriesEntry } from '../interfaces/series-entry';
import { CS_SeriesResponse, Series } from '../interfaces/series';

export const CS_parseSeriesResponse = (data: CS_SeriesResponse[]) => {
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
