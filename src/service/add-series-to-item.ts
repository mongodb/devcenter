import { Series } from '../interfaces/series';
import { SeriesType } from '../types/series-type';
import { ContentItem } from '../interfaces/content-item';

export const addSeriesToItem = (
    item: ContentItem,
    seriesType: SeriesType,
    series: Series[]
) => {
    /*
    get titles from each series entry
    check if item title is in all titles pulled
    if yes set item series to series
     */

    series.forEach(eachSeries => {
        const titlesInThisSeries = eachSeries.seriesEntry.map(
            seriesTypeEntry => seriesTypeEntry?.title
        );
        if (titlesInThisSeries.includes(item.title)) {
            item.series = {
                title: eachSeries.title,
                seriesEntry: eachSeries.seriesEntry,
            };
        }
    });
};
