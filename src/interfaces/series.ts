import { SeriesEntry } from './series-entry';

export interface Series {
    title: string;
    seriesEntry: SeriesEntry[];
}

export interface SeriesEntryConnection {
    edges: { node: { title: string; calculated_slug: string } }[];
}

export interface CS_SeriesResponse {
    series_entryConnection: SeriesEntryConnection;
    title: string;
}
