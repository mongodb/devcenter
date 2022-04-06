import { ContentSeries } from '../../interfaces/content-piece';

export interface SeriesCardProps {
    series: ContentSeries;
    currentSlug: string;
    className?: string;
}
