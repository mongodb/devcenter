import { ContentPiece } from '../../interfaces/content-piece';

export interface CardSectionProps {
    content: ContentPiece[];
    title: string;
    direction?: 'row' | 'column';
    allHref: string;
}

export interface FeaturedCardSectionProps {
    content: ContentPiece[];
}
