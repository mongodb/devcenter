import { Series } from '../../interfaces/series';

export interface SeriesCardProps {
    series: Series;
    currentSlug: string;
    currentTitle: string;
    className?: string;
}
