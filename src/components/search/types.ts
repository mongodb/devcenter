import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';

interface SearchImage {
    url: string;
    alternativeText: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
    calculated_slug: string;
}

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
    placeholder: string;
}

export interface SearchItem {
    type: PillCategory;
    authors: SearchAuthor[];
    name: string;
    image: SearchImage;
    description: string;
    slug: string;
    date: string;
    tags: Tag[];
}
