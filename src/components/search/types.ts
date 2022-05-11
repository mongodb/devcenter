import { ContentItem } from '../../interfaces/content-item';
export interface ResultsProps {
    data: ContentItem[] | undefined;
    isLoading: boolean;
    hasError: boolean;
    layout?: 'list' | 'grid';
}
export interface SearchProps {
    className?: string;
    tagSlug?: string;
    title: string;
    contentType?: string;
    filters?: string[];
    resultsLayout?: 'list' | 'grid';
    titleLink?: {
        text: string;
        href: string;
    };
}
