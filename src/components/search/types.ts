import { ContentItem } from '../../interfaces/content-item';

export type SortByType = 'recent' | 'popular' | 'rated';

export interface ResultsProps {
    data: ContentItem[][] | undefined;
    isLoading: boolean;
    hasError: boolean;
    layout?: 'list' | 'grid';
}
export interface IsortByOptions {
    [key: string]: string;
}

export interface SearchProps {
    className?: string;
    slug?: string;
    title: string;
    hideSortBy?: boolean;
    contentType?: string;
    filters?: string[];
    resultsLayout?: 'list' | 'grid';
    titleLink?: {
        text: string;
        href: string;
    };
}
