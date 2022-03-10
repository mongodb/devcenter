import { ContentPiece } from '../../interfaces/content-piece';

export type SortByType = 'recent' | 'popular' | 'rated';

export interface ResultsProps {
    data: ContentPiece[][] | undefined;
    isLoading: boolean;
    hasError: boolean;
}
export interface IsortByOptions {
    [key: string]: string;
}

export interface SearchProps {
    slug?: string;
    name: string;
    hideSortBy?: boolean;
    filters?: string[];
}
