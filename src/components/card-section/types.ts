import { ContentPiece } from '../../interfaces/content-piece';

export interface CardSectionProps {
    content: ContentPiece[];
    title: string;
    direction?: 'row' | 'column';
}

export interface FeaturedCardSectionProps {
    content: ContentPiece[];
    className?: string;
    title?: string;
}
