import { SeriesEntry } from '../interfaces/series-entry';

export type SeriesType = 'article' | 'podcast' | 'video';

export type SeriesEntryInResponse = {
    [k: string]: SeriesEntry;
};

export type SeriesResponse = {
    title: string;
    seriesEntry: SeriesEntryInResponse[];
};
