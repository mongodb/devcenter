import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { ThemeUICSSObject } from 'theme-ui';
import { FilterItem } from '@mdb/devcenter-components';
import { ReactElement } from 'react';

interface SearchImage {
    url: string;
    alternativeText: string;
}

interface SearchAuthor {
    name: string;
    image: SearchImage;
    calculated_slug: string;
}

export interface SearchBoxProps {
    placeholder?: string;
    searchString?: string;
    onSearch: any;
    autoFocus?: boolean;
    extraStyles?: ThemeUICSSObject;
}

export interface SortBoxProps {
    extraStyles?: ThemeUICSSObject;
    onSort: (value?: string) => void;
    sortBy: string;
}

export interface LocationBoxProps {
    location?: string;
    onLocationChange: any;
    extraStyles?: ThemeUICSSObject;
}

export interface ResultsProps {
    results: ContentItem[] | undefined;
    isValidating: boolean;
    error: boolean;
    searchString: string;
    filters: FilterItem[];
    sortBy: string;
    slug: string;
    pageNumber: number;
    updatePageMeta?: (pageNumber: number) => void;
    noResultsFooter?: ReactElement;
    contentType: string;
    layout?: 'list' | 'grid';
    extraStyles?: ThemeUICSSObject;
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

// add back when Most Popular is implemented
// export type SortByType = 'Most Recent' | 'Most Popular' | 'Highest Rated';
export type SortByType = 'Most Recent' | 'Highest Rated';
export const defaultSortByType: SortByType = 'Most Recent';
